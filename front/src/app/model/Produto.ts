import { StatusProduto } from "./enums/StatusProduto";

export interface Produto {
    id: number,
    nome: string,
    descricao: string,
    quantidadeCaixa: number,
    precoVenda: number,
    precoCompra: number,
    status: StatusProduto,
    quantidadeEmEstoque: number
}