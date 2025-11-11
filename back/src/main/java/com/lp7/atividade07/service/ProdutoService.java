package com.lp7.atividade07.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lp7.atividade07.dto.ProdutoRequestDTO;
import com.lp7.atividade07.dto.ProdutoResponseDTO;
import com.lp7.atividade07.exception.CampoObrigatorioNuloException;
import com.lp7.atividade07.exception.ProdutoNaoEncontradoException;
import com.lp7.atividade07.mapper.ProdutoMapper;
import com.lp7.atividade07.model.Estoque;
import com.lp7.atividade07.model.Produto;
import com.lp7.atividade07.model.enums.StatusProduto;
import com.lp7.atividade07.repository.EstoqueRepository;
import com.lp7.atividade07.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    EstoqueRepository estoqueRepository;

    @Autowired
    ProdutoMapper produtoMapper;

    public ProdutoResponseDTO buscarProdutoID(Long id){
          Produto produto = produtoRepository.findById(id)
        .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto não encontrado com o ID: " + id));

    return produtoMapper.toResponseDTO(produto);
    }

    public List<ProdutoResponseDTO> listarTodos(){
        return produtoRepository.findAll().stream()
                    .map(produtoMapper::toResponseDTO)
                    .toList();
    }

    public ProdutoResponseDTO cadastrarProduto(ProdutoRequestDTO produtoRequestDTO) {
        Estoque estoque = new Estoque();
        Produto produto = produtoMapper.toEntity(produtoRequestDTO, estoque);
        if(produtoRequestDTO.nome() == null || produtoRequestDTO.nome().trim().isEmpty())
           throw new CampoObrigatorioNuloException("nome");

        if(produtoRequestDTO.descricao() == null || produtoRequestDTO.descricao().trim().isEmpty())
           throw new CampoObrigatorioNuloException("descricao");

       if(produtoRequestDTO.precoVenda() == null || produtoRequestDTO.precoVenda().compareTo(BigDecimal.ZERO) <= 0)
           throw new CampoObrigatorioNuloException("preço de venda deve ser maior que zero");

       if(produtoRequestDTO.precoCusto() == null || produtoRequestDTO.precoCusto().compareTo(BigDecimal.ZERO) <= 0)
           throw new CampoObrigatorioNuloException("preço de custo deve ser maior que zero");
       if(produtoRequestDTO.quantidadeCaixa() == null || produtoRequestDTO.quantidadeCaixa() < 0)
          throw new CampoObrigatorioNuloException("quantidade em caixa de ser maior ou igual a zero");
     

        estoque.setProduto(produto);
        estoque.setQuantidade(0);
        produto.setEstoque(estoque);

        Produto salvo = produtoRepository.save(produto);
        return produtoMapper.toResponseDTO(salvo);
    }

    public ProdutoResponseDTO atualizarProduto(ProdutoRequestDTO produtoRequestDTO){
         if(produtoRequestDTO.id() == null)
        throw new CampoObrigatorioNuloException("id");
    
    if(produtoRequestDTO.nome() == null || produtoRequestDTO.nome().trim().isEmpty())
        throw new CampoObrigatorioNuloException("nome é obrigatorio");

    if(produtoRequestDTO.descricao() == null || produtoRequestDTO.descricao().trim().isEmpty())
        throw new CampoObrigatorioNuloException("descrição");

    if(produtoRequestDTO.quantidadeCaixa() == null || produtoRequestDTO.quantidadeCaixa() < 0)
        throw new CampoObrigatorioNuloException("quantidade da caixa deve ser maior ou igual a zero");

    if(produtoRequestDTO.precoCusto() == null || produtoRequestDTO.precoCusto().compareTo(BigDecimal.ZERO) <= 0)
        throw new CampoObrigatorioNuloException("preço de custo deve ser maior que zero");

    if(produtoRequestDTO.precoVenda() == null || produtoRequestDTO.precoVenda().compareTo(BigDecimal.ZERO) <= 0)
        throw new CampoObrigatorioNuloException("preço de venda deve ser maior que zero");

    Produto produtoExistente = produtoRepository.findById(produtoRequestDTO.id())
            .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto com ID " + produtoRequestDTO.id() + " não encontrado."));
    Estoque estoqueExistente = estoqueRepository.findByProdutoId(produtoExistente.getId())
        .orElseThrow(() -> new ProdutoNaoEncontradoException("Estoque do produto não encontrado."));
    Produto produtoAtualizado = produtoMapper.toEntity(produtoRequestDTO, estoqueExistente);

    Produto salvo = produtoRepository.save(produtoAtualizado);

    return produtoMapper.toResponseDTO(salvo);
    }

    public boolean alterarStatus ( Long id){
        Produto produto = produtoRepository.findById(id)
        .orElseThrow(() -> new ProdutoNaoEncontradoException("Produto não encontrado com o ID: " + id));

        if(produto.getStatus() == StatusProduto.ATIVO) produto.setStatus(StatusProduto.INATIVO);
        else produto.setStatus(StatusProduto.ATIVO);

        produtoRepository.save(produto);
        return true;
    }
}
