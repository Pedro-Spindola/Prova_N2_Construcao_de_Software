import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth-service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(LoginService);
  const router = inject(Router);

  const usuario = auth.getUsuarioLogado();

  // 🔒 1. Não logado → Redireciona para login
  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }

  // 🔑 2. Verifica se a rota exige cargo (role)
  const rolesPermitidos = route.data?.['roles'] as string[] | undefined;

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.perfil)) {
    // Usuário existe mas não tem permissão → redireciona
    router.navigate(['/acesso-negado']);
    return false;
  }

  return true; // OK
};
