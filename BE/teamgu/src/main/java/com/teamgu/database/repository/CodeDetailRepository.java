package com.teamgu.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teamgu.database.entity.CodeDetail;


@Repository
public interface CodeDetailRepository extends JpaRepository<CodeDetail, Long>  {

}
