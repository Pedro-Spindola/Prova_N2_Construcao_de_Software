package com.lp7.atividade07.controller;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lp7.atividade07.model.Caixa;
import com.lp7.atividade07.service.CaixaService;

@RestController
@RequestMapping("/api/v1/caixa")
public class CaixaController {

    private final CaixaService caixaService;

    public CaixaController(CaixaService caixaService) {
        this.caixaService = caixaService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caixa> obterCaixa(@PathVariable Long id) {
        return ResponseEntity.ok(caixaService.obterCaixa(id));
    }

    @PutMapping("/{id}/atualizar")
    public ResponseEntity<Caixa> atualizarCarteira(
            @PathVariable Long id,
            @RequestBody BigDecimal novoValor) {

        return ResponseEntity.ok(caixaService.atualizarCarteira(id, novoValor));
    }

    @PutMapping("/{id}/acrescentar")
    public ResponseEntity<Caixa> acrescentarValor(
            @PathVariable Long id,
            @RequestBody BigDecimal valor) {

        return ResponseEntity.ok(caixaService.acrescentarValor(id, valor));
    }
}