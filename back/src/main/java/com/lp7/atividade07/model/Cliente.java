package com.lp7.atividade07.model;

import java.util.List;

import com.lp7.atividade07.model.enums.StatusCliente;
import com.lp7.atividade07.model.enums.TipoCliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = true)
    private String nome;
    @Column(nullable = true)
    private TipoCliente tipo;
    @Column(nullable = true)
    private String documento;
    @Column(nullable = true)
    private String endereco;
    @Column(nullable = true)
    private StatusCliente status;
    @OneToMany(mappedBy = "cliente")
    private List<Pedido> pedidos;


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
    public TipoCliente getTipo() {
        return tipo;
    }
    public void setTipo(TipoCliente tipo) {
        this.tipo = tipo;
    }
    public String getDocumento() {
        return documento;
    }
    public void setDocumento(String documento) {
        this.documento = documento;
    }
    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public StatusCliente getStatus() {
        return status;
    }
    public void setStatus(StatusCliente status) {
        this.status = status;
    }
    public List<Pedido> getPedidos() {
        return pedidos;
    }
    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }
}
