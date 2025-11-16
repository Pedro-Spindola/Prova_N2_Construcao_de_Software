package com.lp7.atividade07.model;

import java.math.BigDecimal;

import com.lp7.atividade07.model.enums.StatusProduto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = true)
    private String nome;
    // CODIGO DE BARRA FUTURAMENTE.
    @Column(nullable = true)
    private String descricao;
    @Column(nullable = true)
    private Integer quantidadeCaixa;
    @Column(nullable = true)
    private BigDecimal precoCusto;
    @Column(nullable = true)
    private BigDecimal precoVenda;
    // DATA DE FABRICAÇÃO FUTURAMENTE.
    // DATA DE VENCIMENTO FUTURAMENTE.
    @Column(nullable = true)
    private StatusProduto status;
    @OneToOne(mappedBy = "produto", cascade = CascadeType.ALL)
    private Estoque estoque;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Integer getQuantidadeCaixa() {
        return quantidadeCaixa;
    }
    public void setQuantidadeCaixa(Integer quantidadeCaixa) {
        this.quantidadeCaixa = quantidadeCaixa;
    }
    public BigDecimal getPrecoCusto() {
        return precoCusto;
    }
    public void setPrecoCusto(BigDecimal precoCusto) {
        this.precoCusto = precoCusto;
    }
    public BigDecimal getPrecoVenda() {
        return precoVenda;
    }
    public void setPrecoVenda(BigDecimal precoVenda) {
        this.precoVenda = precoVenda;
    }
    public StatusProduto getStatus() {
        return status;
    }
    public void setStatus(StatusProduto status) {
        this.status = status;
    }
    public Estoque getEstoque() {
        return estoque;
    }
    public void setEstoque(Estoque estoque) {
        this.estoque = estoque;
    }
}
