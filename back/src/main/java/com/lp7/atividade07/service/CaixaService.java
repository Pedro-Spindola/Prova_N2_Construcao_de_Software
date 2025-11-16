package com.lp7.atividade07.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.lp7.atividade07.model.Caixa;
import com.lp7.atividade07.repository.CaixaRepository;

@Service
public class CaixaService {

    private final CaixaRepository caixaRepository;

    public CaixaService(CaixaRepository caixaRepository) {
        this.caixaRepository = caixaRepository;
    }

    public Caixa obterCaixa(Long id) {
        return caixaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Caixa não encontrado"));
    }

    public Caixa atualizarCarteira(Long id, BigDecimal novoValor) {
        Caixa caixa = obterCaixa(id);
        caixa.setCarteira(novoValor);
        return caixaRepository.save(caixa);
    }

    public Caixa acrescentarValor(Long id, BigDecimal valor) {
        Caixa caixa = obterCaixa(id);

        if (caixa.getCarteira() == null) {
            caixa.setCarteira(BigDecimal.ZERO);
        }

        caixa.acrescentarCaixa(valor);
        return caixaRepository.save(caixa);
    }
}
