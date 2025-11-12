import { ItemCompraRequest } from "./ItemCompraRequest";

export interface Pedido{
    id: number,
    usuario: string,
    cliente: string,
    data?: string,
    total: number,
    troco: number,
    itensComprados: ItemCompraRequest[]
}