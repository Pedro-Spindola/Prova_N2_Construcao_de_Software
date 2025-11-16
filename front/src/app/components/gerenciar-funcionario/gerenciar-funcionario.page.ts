import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PerfilUsuario } from '../../model/enums/PerfilUsuario';
import { StatusUsuario } from '../../model/enums/StatusUsuario';
import { Funcionario } from '../../model/Funcionario';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario-service';

@Component({
  selector: 'app-gerenciar-funcionario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gerenciar-funcionario.page.html',
  styleUrl: './gerenciar-funcionario.page.scss',
})
export class GerenciarFuncionarioPage {
  funcionarioForm: FormGroup;
  isEditing = false;
  funcionarioId: number | null = null;
  
  // Enums para o template
  statusOptions = Object.values(StatusUsuario);
  perfilOptions = Object.values(PerfilUsuario);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {
    this.funcionarioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      perfil: [PerfilUsuario.ADMIN, Validators.required],
      status: [StatusUsuario.ATIVO, Validators.required],
      senha: [''],
      confirmarSenha: ['']
    }, {
      // Validador customizado para garantir que as senhas são iguais
      validators: this.senhasCoincidemValidator
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      // MODO EDIÇÃO
      this.isEditing = true;
      this.funcionarioId = +idParam;
      this.carregarFuncionario();
      
      this.funcionarioForm.get('senha')?.clearValidators();
      this.funcionarioForm.get('confirmarSenha')?.clearValidators();
      
    } else {
      // MODO CRIAÇÃO
      this.isEditing = false;
      
      // Senha é obrigatória na criação
      this.funcionarioForm.get('senha')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.funcionarioForm.get('confirmarSenha')?.setValidators([Validators.required]);
    }

    // Atualiza a validação
    this.funcionarioForm.get('senha')?.updateValueAndValidity();
    this.funcionarioForm.get('confirmarSenha')?.updateValueAndValidity();
  }

  /**
   * (SIMULAÇÃO) Carrega dados do funcionário.
   */
  carregarFuncionario(): void {
    // 1. Verificação de segurança, caso o ID não exista
    if (!this.funcionarioId) {
      console.error('Modo Edição, mas nenhum ID foi fornecido.');
      this.voltar();
      return;
    }

    console.log('Modo Edição: Carregando funcionario ID:', this.funcionarioId);

    // 2. Chama o serviço para buscar o cliente
    this.funcionarioService.findById(this.funcionarioId).subscribe({
      next: (dadosDoCliente) => {
        console.log('Funcionario carregado com sucesso: ', dadosDoCliente);
        this.funcionarioForm.patchValue(dadosDoCliente);
        const senhaRecebida = this.funcionarioForm.get('senha')?.value;
        if (senhaRecebida) {
          this.funcionarioForm.get('confirmarSenha')?.setValue(senhaRecebida);
        }
      },
      error: (erro) => {
        console.error('Falha ao carregar os dados do cunfionario.', erro);
        this.voltar();
      }
    });
  }

  /**
   * Chamado ao clicar em "Salvar".
   */
  onSubmit(): void {
    if (this.funcionarioForm.invalid) {
      console.log('Formulário inválido');
      this.funcionarioForm.markAllAsTouched();
      return;
    }

    const formData = this.funcionarioForm.getRawValue();

    // Remove 'confirmarSenha' do objeto a ser enviado
    delete formData.confirmarSenha;

    // Se estiver editando e a senha estiver vazia, não envie o campo senha
    if (this.isEditing && !formData.senha) {
      delete formData.senha;
    }

    if (this.isEditing) {
        if(this.funcionarioId != null){
          console.log('Salvando (Update):', formData);
          this.funcionarioService.update(formData, this.funcionarioId).subscribe(() => {
            this.router.navigate(['funcionarios']); // Navega de volta
          });
        }
    } else {
      console.log('Salvando (Create):', formData);
        this.funcionarioService.create(formData).subscribe(() => {
          this.router.navigate(['funcionarios']); // Navega de volta
        });
    }
    this.router.navigate(['funcionario']); // Rota da sua listagem
  }

  // Validador customizado
  senhasCoincidemValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');
    
    // Se 'confirmarSenha' não for igual a 'senha'
    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      // Define o erro no controle 'confirmarSenha'
      confirmarSenha.setErrors({ 'senhasNaoCoincidem': true });
      return { 'senhasNaoCoincidem': true };
    } else {
      // Limpa o erro se as senhas coincidirem
      if (confirmarSenha?.hasError('senhasNaoCoincidem')) {
        confirmarSenha.setErrors(null);
      }
      return null;
    }
  }

  // Atalho para acesso aos controles no HTML
  get f(): { [key: string]: AbstractControl } {
    return this.funcionarioForm.controls;
  }

  voltar(): void {
    this.router.navigateByUrl('/funcionario');
  }
}
