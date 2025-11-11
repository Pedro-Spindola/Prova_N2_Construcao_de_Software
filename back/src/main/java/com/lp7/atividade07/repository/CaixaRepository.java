package com.lp7.atividade07.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lp7.atividade07.model.Caixa;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Long> {
    
}
