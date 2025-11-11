import { Item } from "./Item";

export interface Pedido{
    id: number,
    funcionario: string,
    cliente: string,
    data: string,
    valorTotal: number,
    item: Item[]
}