package com.lp7.atividade07.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lp7.atividade07.dto.ProdutoRequestDTO;
import com.lp7.atividade07.dto.ProdutoResponseDTO;
import com.lp7.atividade07.service.ProdutoService;
@RestController
@RequestMapping("/api/v1/produto")
public class ProdutoController {
        @Autowired
        ProdutoService produtoService;

        @GetMapping("/{id}")
        public ProdutoResponseDTO buscarProdutoID(@PathVariable Long id){
                return produtoService.buscarProdutoID(id);
        }

        @GetMapping
        public List<ProdutoResponseDTO> listarTodosProdutos(){
             return produtoService.listarTodos();  
        }

        @PostMapping
        public ProdutoResponseDTO criarProduto(@RequestBody ProdutoRequestDTO produtoRequestDTO){
                return produtoService.cadastrarProduto(produtoRequestDTO);
        }

        @PutMapping("/{id}")
        public ProdutoResponseDTO atualizarProduto(@RequestBody ProdutoRequestDTO produtoRequestDTO, @PathVariable Long id){
                return produtoService.atualizarProduto(produtoRequestDTO,id);
        }

       
}
