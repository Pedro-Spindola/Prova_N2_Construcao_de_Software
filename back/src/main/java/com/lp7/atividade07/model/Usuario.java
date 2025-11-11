package com.lp7.atividade07.model;

import java.util.List;

import com.lp7.atividade07.model.enums.PerfilUsuario;
import com.lp7.atividade07.model.enums.StatusUsuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = true)
    private String nome;
    @Column(nullable = true)
    private String email;
    @Column(nullable = true)
    private String senha;
    @Column(nullable = true)
    private PerfilUsuario perfil;
    @Column(nullable = true)
    private StatusUsuario status;
    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidosRegistrados;


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
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public PerfilUsuario getPerfil() {
        return perfil;
    }
    public void setPerfil(PerfilUsuario perfil) {
        this.perfil = perfil;
    }
    public StatusUsuario getStatus() {
        return status;
    }
    public void setStatus(StatusUsuario status) {
        this.status = status;
    }
    public List<Pedido> getPedidosRegistrados() {
        return pedidosRegistrados;
    }
    public void setPedidosRegistrados(List<Pedido> pedidosRegistrados) {
        this.pedidosRegistrados = pedidosRegistrados;
    }
}
