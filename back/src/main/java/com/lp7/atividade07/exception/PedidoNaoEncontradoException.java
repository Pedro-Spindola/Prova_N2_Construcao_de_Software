package com.lp7.atividade07.exception;

public class PedidoNaoEncontradoException extends RuntimeException{
  public PedidoNaoEncontradoException(String mensagem){
    super(mensagem);
  }
}
