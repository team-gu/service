package com.teamgu.database.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import com.teamgu.database.entity.QStdClass;
import com.teamgu.database.entity.QUserClass;
import com.teamgu.database.entity.QUser;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

@Log4j2
public class UserPoolRepositoryImpl implements UserPoolRepositoryCustom {

    private static short majorCode;
    private static int prjCode, regionCode;
    private static long classId;
    private static String email, sort, stage, studentNum, target;
    private static List<Integer> regList, posList, trkList, skList;

    QUser qUser = QUser.user;
    QUserClass qUserClass = QUserClass.userClass;
    QStdClass qStdClass = QStdClass.stdClass;

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    CodeDetailRepository codeDetailRepository;

    @PersistenceUnit
    EntityManagerFactory emf;

    @Override
    public List<Object[]> findUsersByFilter(UserPoolPageReqDto userPoolPageReqDto) {
        log.info(userPoolPageReqDto);

        try {
            studentNum = userPoolPageReqDto.getStudentNumber(); //무조건 들어와야하는 값
            prjCode = userPoolPageReqDto.getProject(); //무조건 들어와야하는 값
            regionCode = Integer.parseInt(userPoolPageReqDto.getStudentNumber().substring(2, 3)) + 100; //공통 프로젝트의 경우 반 필터링을 위해 지역 코드 뽑아옴
            stage = userPoolPageReqDto.getStudentNumber().substring(0, 2); //무조건 들어와야하는 값 (기수)
        } catch (Exception e) {
            log.error("substring 에러");
        }

        if(prjCode == 101) {
            classId = getUserClassId();
        }

        regList = userPoolPageReqDto.getRegion();
        posList = userPoolPageReqDto.getPosition();
        trkList = userPoolPageReqDto.getTrack(); //얘는 쿼리문 돌리고 나서 처리 조인해야되는 테이블떄문에
        skList = userPoolPageReqDto.getSkills(); //얘도 쿼리문 돌리고 나서 처리

        majorCode = userPoolPageReqDto.getIsMajor(); //얘네는 where에서 처리
        email = userPoolPageReqDto.getEmail();
        sort = userPoolPageReqDto.getSort();

        String whereStmt = makeFilterWhere(true);
        String orderStmt = makeFilterOrder();
        String havingStmt = makeFilterHaving();

        return getFilteredList(whereStmt, orderStmt, havingStmt);
    }

    @Override
    public long getUserClassId() {
        return jpaQueryFactory.select(qStdClass.id)
                .from(qUserClass)
                .innerJoin(qUser)
                    .on(qUserClass.user.eq(qUser))
                .innerJoin(qStdClass)
                    .on(qUserClass.stdClass.eq(qStdClass))
                .where(qUser.studentNumber.eq(studentNum)
                        .and(qStdClass.projectCode.eq(prjCode)))
                .fetchOne();
    }

    @Override
    public List<Object[]> findUsersBySimName(UserPoolNameReqDto userPoolNameReqDto) {
        log.info(userPoolNameReqDto);

        try {
            studentNum = userPoolNameReqDto.getStudentNumber(); //무조건 들어와야하는 값
            prjCode = userPoolNameReqDto.getProject(); //무조건 들어와야하는 값
            stage = userPoolNameReqDto.getStudentNumber().substring(0, 2); //무조건 들어와야하는 값
        } catch (Exception e) {
            log.error("substring 에러");
        }

        regList = userPoolNameReqDto.getRegion();
        posList = userPoolNameReqDto.getPosition();
        trkList = userPoolNameReqDto.getTrack();
        skList = userPoolNameReqDto.getSkills();

        //검색하려는 대상의 문자열이 null인 경우(아예 없는 경우) 공백으로 처리
        target = StringUtils.isEmpty(userPoolNameReqDto.getTarget()) ? "" : userPoolNameReqDto.getTarget();
        majorCode = userPoolNameReqDto.getIsMajor();

        String whereStmt = makeFilterWhere(false);
        String havingStmt = makeFilterHaving();

        return getAutoUserList(whereStmt, havingStmt);
    }

    private String makeFilterWhere(boolean flag) {
        StringBuilder sb = new StringBuilder("where pd.project_code = " + prjCode);

        //같은 프로젝트 내에서 팀을 만들지 않은 사람들만 조회
        sb.append(" and u.id not in (select ut.user_id from team inner join user_team ut on team.id = ut.team_id inner join mapping m2 on team.mapping_id = m2.id where m2.project_code = " + prjCode + ")");
        sb.append(" and (u.student_number like '" + stage + "%')");
        sb.append(" and (u.student_number != '" + studentNum + "')");

        if (!CollectionUtils.isEmpty(regList)) { //지역
            sb.append(" and (");
            int idx = 0;
            for (int elem : regList) {
                elem %= 10; //Region 코드의 마지막 자리만 필요
                if (idx != 0) {
                    sb.append(" or ");
                }
                sb.append("u.student_number like '__" + elem + "____'");
                idx++;
            }
            sb.append(")");
        }

        if (!CollectionUtils.isEmpty(posList)) { //포지션 필터
            sb.append(" and (");
            int idx = 0;
            for (int elem : posList) {
                if (idx != 0) {
                    sb.append(" or ");
                }
                sb.append("u.wish_position_code = " + elem);
                idx++;
            }
            sb.append(")");
        }

        if (!CollectionUtils.isEmpty(skList)) { //스킬 필터
            sb.append(" and (");
            int idx = 0;
            for (int elem : skList) {
                if (idx != 0) {
                    sb.append(" and ");
                }
                sb.append("b.gs like '%" + elem + "%'");
                idx++;
            }
            sb.append(")");
        }

        if (majorCode != 0)
            sb.append(" ").append("and u.major = " + majorCode);
        else
            sb.append(" ").append("and u.major != " + majorCode);

        if (flag && !StringUtils.isEmpty(email)) //인력풀 검색버튼 누르게되면 동작하는 where문
            sb.append(" ").append("and u.email = '" + email + "'");

        if(!flag) { //인력풀 자동완성에서 동작하는 where문
            sb.append(" ").append("and (u.name like '%" + target + "%' or u.email like '%" + target + "%')");
        }

        if(prjCode == 101) { //공통 프로젝트의 경우에는 동일한 반 사람들만
            sb.append(" ").append("and uc.class_id = " + classId);
        }

        return sb.toString();
    }

    private String makeFilterOrder() {
        return "order by u.name " + sort;
    }

    private String makeFilterHaving() {
        StringBuilder sb = new StringBuilder();

        if (!CollectionUtils.isEmpty(trkList)) { //트랙 필터
            sb.append("having (");
            int idx = 0;
            for (int elem : trkList) {
                if (idx != 0) {
                    sb.append(" or ");
                }
                sb.append("wish_track like '%" + elem + "%'");
                idx++;
            }
            sb.append(")");
        }

        return sb.toString();
    }

    private List<Object[]> getAutoUserList(String whereStmt, String havingStmt) {
        StringBuilder jpql = new StringBuilder();
        EntityManager em = emf.createEntityManager();
        List<Object[]> res = null;

        jpql.append("select u.id as id, u.name as name, u.email, u.profile_server_name, u.profile_extension").append(" ");
        jpql.append("from project_detail pd").append(" ");
        jpql.append("inner join user_project_detail upd on pd.id = upd.project_detail_id").append(" ");
        jpql.append("inner join user u on upd.user_id = u.id").append(" ");
        jpql.append("left join wish_track wt on u.id = wt.user_id").append(" ");
        jpql.append("left outer join mapping m on wt.mapping_id = m.id").append(" ");
        jpql.append("left outer join (select s.user_id, group_concat(s.skill_code) as gs from skill s group by s.user_id) as b on u.id = b.user_id").append(" ");
        if(prjCode == 101) {
            jpql.append("inner join user_class uc on u.id = uc.user_id").append(" ");
        }
        jpql.append(whereStmt).append(" ");
        jpql.append("group by u.id, u.name").append(" ");
        jpql.append(havingStmt);

        res = em.createNativeQuery(jpql.toString()).getResultList();

        em.close();

        return res;
    }

    private List<Object[]> getFilteredList(String whereStmt, String orderStmt, String havingStmt) {
        StringBuilder jpql = new StringBuilder();
        EntityManager em = emf.createEntityManager();
        List<Object[]> res = null;

        jpql.append("select u.id as id, u.name as name, u.introduce, u.profile_server_name, u.profile_extension, group_concat(m.track_code) as wish_track, gs").append(" ");
        jpql.append("from project_detail pd").append(" ");
        jpql.append("inner join user_project_detail upd on pd.id = upd.project_detail_id").append(" ");
        jpql.append("inner join user u on upd.user_id = u.id").append(" ");
        jpql.append("left join wish_track wt on u.id = wt.user_id").append(" ");
        jpql.append("left outer join mapping m on wt.mapping_id = m.id").append(" ");
        jpql.append("left outer join (select s.user_id, group_concat(s.skill_code) as gs from skill s group by s.user_id) as b on u.id = b.user_id").append(" ");
        if(prjCode == 101) {
            jpql.append("inner join user_class uc on u.id = uc.user_id").append(" ");
        }
        jpql.append(whereStmt).append(" ");
        jpql.append("group by u.id, u.name").append(" ");
        jpql.append(havingStmt).append(" ");
        jpql.append(orderStmt);

        log.info(jpql.toString());

        res = em.createNativeQuery(jpql.toString()).getResultList();

        em.close();

        return res;
    }
}
