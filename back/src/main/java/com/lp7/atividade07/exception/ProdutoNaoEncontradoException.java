package com.lp7.atividade07.exception;

public class ProdutoNaoEncontradoException  extends RuntimeException{
  public ProdutoNaoEncontradoException (String mensagen){
    super(mensagen);
  }
}
