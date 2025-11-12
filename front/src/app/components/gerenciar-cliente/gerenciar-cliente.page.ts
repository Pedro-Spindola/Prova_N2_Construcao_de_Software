import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusCliente } from '../../model/enums/StatusCliente';
import { Cliente } from '../../model/Cliente';
import { TipoCliente } from '../../model/enums/TipoCliente';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente-service';

@Component({
  selector: 'app-gerenciar-cliente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gerenciar-cliente.page.html',
  styleUrl: './gerenciar-cliente.page.scss',
})
export class GerenciarClientePage implements OnInit {
  clienteForm: FormGroup;
  isEditing = false;
  clienteId: number | null = null;
  
  // Enums para o template
  statusOptions = Object.values(StatusCliente);
  tipoOptions = Object.values(TipoCliente);
  TipoCliente = TipoCliente;

  // Propriedades dinâmicas para o campo 'documento'
  documentoLabel = 'CPF';
  documentoMask = '000.000.000-00';
  documentoPlaceholder = 'Digite o CPF';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Para ler o ID da URL
    private router: Router,
    private clienteService: ClienteService // Injete seu serviço
  ) {
    this.clienteForm = this.fb.group({
      id: [{ value: null, disabled: true }],

      nome: ['', Validators.required],
      tipo: [TipoCliente.PF, Validators.required],
      documento: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Validação inicial de CPF
      endereco: ['', Validators.required], // Opcional
      status: [StatusCliente.ATIVO, Validators.required],
    });
  }

  ngOnInit(): void {
    // 1. Escuta mudanças no campo 'tipo' para alterar a validação do 'documento'
    this.setupTipoClienteListener();

    // 2. Verifica se está em modo de edição
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isEditing = true;
      this.clienteId = +idParam; // Converte string 'id' para number
      this.carregarCliente();
    } else {
      // Se for novo, força a atualização inicial para 'PF'
      this.atualizarCamposDocumento(TipoCliente.PF);
    }
  }

  /*
   * Fica "escutando" o campo 'tipo' (PF/PJ) e chama a função
   * que atualiza a validação, máscara e label do campo 'documento'.
   */
  setupTipoClienteListener(): void {
    this.clienteForm.get('tipo')?.valueChanges.subscribe((tipo: TipoCliente) => {
      this.clienteForm.get('documento')?.setValue('');
      this.atualizarCamposDocumento(tipo);
    });
  }

  /**
   * Altera dinamicamente os validadores, máscara e labels do campo 'documento'
   * com base no tipo de cliente (PF ou PJ).
   */
  atualizarCamposDocumento(tipo: TipoCliente): void {
    const documentoControl = this.clienteForm.get('documento');
    if (!documentoControl) return;

    documentoControl.clearValidators();

    if (tipo === this.TipoCliente.PF) {
      this.documentoLabel = 'CPF';
      this.documentoMask = '000.000.000-00';
      this.documentoPlaceholder = 'Digite o CPF';
      // Adiciona validador de CPF (exemplo simples de regex, use um validador real se precisar)
      documentoControl.setValidators([
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      ]);
    } else { // TipoCliente.PJ
      this.documentoLabel = 'CNPJ';
      this.documentoMask = '00.000.000/0000-00';
      this.documentoPlaceholder = 'Digite o CNPJ';
      // Adiciona validador de CNPJ (exemplo simples de regex)
      documentoControl.setValidators([
        Validators.required,
        Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
      ]);
    }
    // Atualiza o estado de validação do controle
    documentoControl.updateValueAndValidity();
  }

  carregarCliente(): void {
    // 1. Verificação de segurança, caso o ID não exista
    if (!this.clienteId) {
      console.error('Modo Edição, mas nenhum ID foi fornecido.');
      this.voltar();
      return;
    }

    console.log('Modo Edição: Carregando cliente ID:', this.clienteId);

    // 2. Chama o serviço para buscar o cliente
    this.clienteService.findById(this.clienteId).subscribe({
      next: (dadosDoCliente) => {
        console.log('Cliente carregado com sucesso: ', dadosDoCliente);
        this.clienteForm.patchValue(dadosDoCliente);
        this.atualizarCamposDocumento(dadosDoCliente.tipo);
      },
      error: (erro) => {
        console.error('Falha ao carregar os dados do cliente.', erro);
        alert('Erro ao carregar cliente. Tente novamente.');
        this.voltar();
      }
    });
  }

  /**
   * Chamado ao clicar em "Salvar".
   */
  onSubmit(): void {
    if (this.clienteForm.invalid) {
      console.log('Formulário inválido');
      this.clienteForm.markAllAsTouched(); // Mostra erros de validação
      return;
    }

    // Pega todos os valores, incluindo o 'id' desabilitado
    const clienteData = this.clienteForm.getRawValue();

    if (this.isEditing) {
      if(this.clienteId != null){
        console.log('Salvando (Update):', clienteData);
        this.clienteService.update(clienteData, this.clienteId).subscribe(() => {
          alert('Cliente atualizado com sucesso!');
          this.voltar();
        });
      }
    } else {
      console.log('Salvando (Create):', clienteData);
      this.clienteService.create(clienteData).subscribe(() => {
        alert('Cliente criado com sucesso!');
        this.voltar();
      });
    }
  }

  /**
   * Chamado ao clicar em "Voltar" ou "Cancelar".
   */
  voltar(): void {
    this.router.navigateByUrl('/cliente');
  }

  /**
   * Retorna o controle do formulário (para validação no HTML)
   */
  get f(): { [key: string]: AbstractControl } {
    return this.clienteForm.controls;
  }
}
