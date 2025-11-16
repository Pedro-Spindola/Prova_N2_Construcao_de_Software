package com.lp7.atividade07.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Caixa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = true)
    private BigDecimal carteira;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public BigDecimal getCarteira() {
        return carteira;
    }
    public void setCarteira(BigDecimal carteira) {
        this.carteira = carteira;
    }

    public void acrescentarCaixa(BigDecimal valor){
        this.carteira = this.carteira.add(valor);
    }
}
