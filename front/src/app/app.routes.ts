import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { ProdutoPage } from './pages/produto/produto.page';
import { GerenciarProdutoPage } from './components/gerenciar-produto/gerenciar-produto.page';
import { ClientePage } from './pages/cliente/cliente.page';
import { GerenciarClientePage } from './components/gerenciar-cliente/gerenciar-cliente.page';
import { FuncionarioPage } from './pages/funcionario/funcionario.page';
import { GerenciarFuncionarioPage } from './components/gerenciar-funcionario/gerenciar-funcionario.page';
import { RelatoriosPage } from './components/relatorios/relatorios.page';
import { LancamentoPage } from './pages/lancamento/lancamento.page';
import { authGuard } from './guards/auth-guard';
import { AcessoNegadoPage } from './pages/acesso-negado/acesso-negado.page';

export const routes: Routes = [
    { path: 'login', component: LoginPage },

    // Rota para acesso negado
    { path: 'acesso-negado', component: AcessoNegadoPage },

    // Home aberta apenas para logados
    { 
        path: '', 
        component: HomePage,
        canActivate: [authGuard]
    },

    // PRODUTO
    { 
        path: 'produto', 
        component: ProdutoPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'gerenciarProduto', 
        component: GerenciarProdutoPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'gerenciarProduto/:id', 
        component: GerenciarProdutoPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },

    // CLIENTE
    { 
        path: 'cliente', 
        component: ClientePage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN', 'OPERADOR'] }
    },
    { 
        path: 'gerenciarCliente', 
        component: GerenciarClientePage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN', 'OPERADOR'] }
    },
    { 
        path: 'gerenciarCliente/:id', 
        component: GerenciarClientePage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN', 'OPERADOR'] }
    },

    // FUNCIONÁRIO
    { 
        path: 'funcionario', 
        component: FuncionarioPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'gerenciarFuncionario', 
        component: GerenciarFuncionarioPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },
    { 
        path: 'gerenciarFuncionario/:id', 
        component: GerenciarFuncionarioPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },

    // RELATÓRIOS
    { 
        path: 'relatorios', 
        component: RelatoriosPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
    },

    // LANÇAMENTO
    { 
        path: 'lancamento', 
        component: LancamentoPage,
        canActivate: [authGuard],
        data: { roles: ['ADMIN', 'OPERADOR'] }
    }
];

