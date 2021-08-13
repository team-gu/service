package com.teamgu.database.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.teamgu.api.dto.req.UserPoolNameReqDto;
import com.teamgu.api.dto.req.UserPoolPageReqDto;
import com.teamgu.api.dto.res.UserPoolNameResDto;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

import com.teamgu.database.entity.QUser;
import com.teamgu.database.entity.QProjectDetail;
import com.teamgu.database.entity.QUserProjectDetail;

@Log4j2
public class UserPoolRepositoryImpl implements UserPoolRepositoryCustom {

    QUser qUser = QUser.user;
    QProjectDetail qProjectDetail = QProjectDetail.projectDetail;
    QUserProjectDetail qUserProjectDetail = QUserProjectDetail.userProjectDetail;

    private static short majorCode;
    private static int prjCode;
    private static String name, sort, stage, studentNum;
    private static List<Integer> regList, posList, trkList, skList;

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
            stage = userPoolPageReqDto.getStudentNumber().substring(0, 2); //무조건 들어와야하는 값
        } catch (Exception e) {
            log.info("substring 에러");
        }


        regList = userPoolPageReqDto.getRegion();
        posList = userPoolPageReqDto.getPosition();
        trkList = userPoolPageReqDto.getTrack(); //얘는 쿼리문 돌리고 나서 처리 조인해야되는 테이블떄문에
        skList = userPoolPageReqDto.getSkills(); //얘도 쿼리문 돌리고 나서 처리

        majorCode = userPoolPageReqDto.getIsMajor(); //얘네는 where에서 처리
        name = userPoolPageReqDto.getName();
        sort = userPoolPageReqDto.getSort();

        String whereStmt = makeFilterWhere();
        String orderStmt = makeFilterOrder();
        String havingStmt = makeFilterHaving();

        return getFilteredList(whereStmt, orderStmt, havingStmt);
    }

    @Override
    public List<UserPoolNameResDto> findUsersBySimName(UserPoolNameReqDto userPoolNameReqDto) {

        //학번이 비어있을 경우 Exception처리
        if(StringUtils.isEmpty(userPoolNameReqDto.getStudentNumber())) {
            throw new RuntimeException("학번이 비어있습니다");
        }

        //검색하려는 대상의 문자열이 null인 경우(아예 없는 경우) 공백으로 처리
        String target = StringUtils.isEmpty(userPoolNameReqDto.getTarget()) ? "" : userPoolNameReqDto.getTarget();
        //학번 처리
        String stage = userPoolNameReqDto.getStudentNumber().substring(0, 2) + "%";

        return jpaQueryFactory
                .select(Projections.constructor
                        (UserPoolNameResDto.class,
                                qUser.id,
                                qUser.profileServerName.concat(".").concat(qUser.profileExtension),
                                qUser.name,
                                qUser.email))
                .from(qProjectDetail)
                .innerJoin(qUserProjectDetail)
                    .on(qUserProjectDetail.projectDetail.eq(qProjectDetail))
                .innerJoin(qUser)
                    .on(qUserProjectDetail.user.eq(qUser))
                .where(qProjectDetail.projectCode.eq(userPoolNameReqDto.getProjectCode())
                        .and(qUser.studentNumber.like(stage))
                        .and((qUser.email.contains(target).or(qUser.name.contains(target)))))
                .orderBy(qUser.id.asc())
                .fetch();
    }

    private String makeFilterWhere() {
        StringBuilder sb = new StringBuilder("where pd.project_code = " + prjCode + " and ut.team_id is null");

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
                    sb.append(" or ");
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
        if (!StringUtils.isEmpty(name))
            sb.append(" ").append("and u.name = '" + name + "'");

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
        jpql.append("left outer join user_team ut on u.id = ut.user_id").append(" ");
        jpql.append(whereStmt).append(" ");
        jpql.append("group by u.id, u.name").append(" ");
        jpql.append(havingStmt).append(" ");
        jpql.append(orderStmt);

        res = em.createNativeQuery(jpql.toString()).getResultList();

        em.close();

        return res;
    }
}
