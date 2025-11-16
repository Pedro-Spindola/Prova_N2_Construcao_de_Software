package com.lp7.atividade07.exception;

public class UsuarioNaoEncontradoException extends RuntimeException {

    public UsuarioNaoEncontradoException(String identificador){
        super("Usuário não encontrado: " + identificador);
    }
}