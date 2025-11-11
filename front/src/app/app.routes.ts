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

export const routes: Routes = [
    { path: '', component: HomePage},
    { path: 'login', component: LoginPage},
    { path: 'produto', component: ProdutoPage},
    { path: 'gerenciarProduto', component: GerenciarProdutoPage},
    { path: 'cliente', component: ClientePage},
    { path: 'gerenciarCliente', component: GerenciarClientePage},
    { path: 'funcionario', component: FuncionarioPage},
    { path: 'gerenciarFuncionario', component: GerenciarFuncionarioPage},
    { path: 'relatorios', component: RelatoriosPage},
    { path: 'lancamento', component: LancamentoPage}
];
