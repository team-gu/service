package com.teamgu.database.repository;

import com.teamgu.api.dto.req.UserPoolReqDto;
import com.teamgu.database.entity.CodeDetail;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.HashMap;
import java.util.List;

@Log4j2
public class UserPoolRepositoryImpl implements UserPoolRepositoryCustom {

    private static short majorCode;
    private static int prjCode;
    private static String name, sort;
    private static List<Integer> regList, posList, trkList, skList;

    @Autowired
    CodeDetailRepository codeDetailRepository;

    @PersistenceUnit
    EntityManagerFactory emf;

    @Override
    public List<Object[]> findUsersByFilter(UserPoolReqDto userPoolReqDto) {
        prjCode = userPoolReqDto.getProject(); //무조건 들어와야하는 값

        regList = userPoolReqDto.getRegion();
        posList = userPoolReqDto.getPosition();
        trkList = userPoolReqDto.getTrack(); //얘는 쿼리문 돌리고 나서 처리 조인해야되는 테이블떄문에
        skList = userPoolReqDto.getSkills(); //얘도 쿼리문 돌리고 나서 처리

        majorCode = userPoolReqDto.getIsMajor(); //얘네는 where에서 처리
        name = userPoolReqDto.getName();
        sort = userPoolReqDto.getSort();

        String whereStmt = makeWhere();
        String orderStmt = makeOrder();

        return getList(whereStmt, orderStmt);
    }

    @Override
    public HashMap<String, String> getCodeDetail() {
        HashMap<String, String> retHash = new HashMap<>();
        List<CodeDetail> sklList = codeDetailRepository.getSklCodeDetail();
        List<CodeDetail> trkList = codeDetailRepository.getTrkCodeDetail();

        for(CodeDetail elem : sklList) {
            retHash.put("SK" + elem.getCodeDetail(), elem.getName());
        }

        for(CodeDetail elem : trkList) {
            retHash.put("TR" + elem.getCodeDetail(), elem.getName());
        }

        return retHash;
    }

    private String makeWhere() {
        StringBuilder sb = new StringBuilder("where pd.project_code = " + prjCode);

        if(!CollectionUtils.isEmpty(regList)) { //학번
            sb.append(" and (");
            int idx = 0;
            for(int elem : regList) {
                elem %= 10; //Region 코드의 마지막 자리만 필요
                if(idx != 0) {
                    sb.append(" or ");
                }
                sb.append("u.student_number like '__" + elem + "____'");
                idx++;
            }
            sb.append(")");
        }

        if(!CollectionUtils.isEmpty(posList)) { //포지션 필터
            sb.append(" and (");
            int idx = 0;
            for(int elem : posList) {
                if(idx != 0) {
                    sb.append(" or ");
                }
                sb.append("u.wish_position_code = " + elem);
            }
            sb.append(")");
        }

        if(!CollectionUtils.isEmpty(trkList)) { //트랙 필터
            sb.append(" and (");
            int idx = 0;
            for(int elem : trkList) {
                if(idx != 0) {
                    sb.append(" or ");
                }
                sb.append("m.track_code = " + elem);
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
                sb.append("s.skill_code = " + elem);
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
        return " order by u.name " + sort;
    }

    private List<Object[]> getList(String whereStmt, String orderStmt) {
        StringBuilder jpql = new StringBuilder();
        EntityManager em = emf.createEntityManager();

        jpql.append("select u.id as id, u.name as name, u.introduce, u.profile_server_name, u.profile_extension, m.track_code as wish_track, s.skill_code, pd.project_code").append(" ");
        jpql.append("from project_detail pd").append(" ");
        jpql.append("inner join user_project_detail upd on pd.id = upd.project_detail_id").append(" ");
        jpql.append("inner join user u on upd.user_id = u.id").append(" ");
        jpql.append("left join wish_track wt on u.id = wt.user_id").append(" ");
        jpql.append("left outer join mapping m on wt.mapping_id = m.id").append(" ");
        jpql.append("left join skill s on u.id = s.user_id").append(" ");
        jpql.append(whereStmt);
        jpql.append(orderStmt);
        log.info(jpql);

        return em.createNativeQuery(jpql.toString()).getResultList();
    }
}
