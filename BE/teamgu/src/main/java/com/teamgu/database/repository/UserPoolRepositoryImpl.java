package com.teamgu.database.repository;

import com.teamgu.api.dto.req.UserPoolReqDto;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

@Log4j2
public class UserPoolRepositoryImpl implements UserPoolRepositoryCustom {

    private static short majorCode;
    private static int prjCode;
    private static String name, sort, stage, studentNum;
    private static List<Integer> regList, posList, trkList, skList;

    @Autowired
    CodeDetailRepository codeDetailRepository;

    @PersistenceUnit
    EntityManagerFactory emf;

    @Override
    public List<Object[]> findUsersByFilter(UserPoolReqDto userPoolReqDto) {
        log.info(userPoolReqDto);

        try {
            studentNum = userPoolReqDto.getStudentNumber(); //무조건 들어와야하는 값
            prjCode = userPoolReqDto.getProject(); //무조건 들어와야하는 값
            stage = userPoolReqDto.getStudentNumber().substring(0, 2); //무조건 들어와야하는 값
        } catch (Exception e) {
            log.info("substring 에러");
        }


        regList = userPoolReqDto.getRegion();
        posList = userPoolReqDto.getPosition();
        trkList = userPoolReqDto.getTrack(); //얘는 쿼리문 돌리고 나서 처리 조인해야되는 테이블떄문에
        skList = userPoolReqDto.getSkills(); //얘도 쿼리문 돌리고 나서 처리

        majorCode = userPoolReqDto.getIsMajor(); //얘네는 where에서 처리
        name = userPoolReqDto.getName();
        sort = userPoolReqDto.getSort();

        String whereStmt = makeWhere();
        String orderStmt = makeOrder();
        String havingStmt = makeHaving();

        return getList(whereStmt, orderStmt, havingStmt);
    }

    private String makeWhere() {
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

        if(!CollectionUtils.isEmpty(skList)) { //스킬 필터
            sb.append(" and (");
            int idx = 0;
            for(int elem : skList) {
                if(idx != 0) {
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

    private String makeOrder() {
        return "order by u.name " + sort;
    }

    private String makeHaving() {
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

    private List<Object[]> getList(String whereStmt, String orderStmt, String havingStmt) {
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
