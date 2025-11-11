import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PerfilUsuario } from '../../model/enums/PerfilUsuario';
import { StatusUsuario } from '../../model/enums/StatusUsuario';
import { Funcionario } from '../../model/Funcionario';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private router: Router
    // private funcionarioService: FuncionarioService
  ) {
    this.funcionarioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      perfil: [PerfilUsuario.ADMIN, Validators.required],
      status: [StatusUsuario.ATIVO, Validators.required],
      // Campos de senha
      senha: [''], // Validador será adicionado dinamicamente
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
      
      // Senha é opcional na edição
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
    console.log('Modo Edição: Carregando funcionário ID:', this.funcionarioId);
    
    // --- Início da Simulação ---
    const mockFuncionario: Funcionario = {
      id: this.funcionarioId!,
      nome: 'Usuário (Carregado da API)',
      email: 'usuario@api.com',
      senha: '', // NUNCA carregar a senha no form
      perfil: PerfilUsuario.ADMIN,
      status: StatusUsuario.ATIVO
    };
    
    // Preenche o formulário (sem a senha)
    this.funcionarioForm.patchValue(mockFuncionario);
    // --- Fim da Simulação ---
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
      console.log('Salvando (Update):', formData);
      // this.funcionarioService.update(this.funcionarioId, formData).subscribe(() => {
      //   alert('Funcionário atualizado com sucesso!');
      //   this.router.navigate(['/admin/funcionarios']); // Navega de volta
      // });
    } else {
      console.log('Salvando (Create):', formData);
      // this.funcionarioService.create(formData).subscribe(() => {
      //   alert('Funcionário criado com sucesso!');
      //   this.router.navigate(['/admin/funcionarios']); // Navega de volta
      // });
    }
    
    // Simulação de navegação após salvar
    alert('Salvo com sucesso! (Simulação)');
    this.router.navigate(['/admin/funcionarios']); // Rota da sua listagem
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
