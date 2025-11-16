import { StatusCliente } from "./enums/StatusCliente";
import { TipoCliente } from "./enums/TipoCliente";

export interface Cliente{
    id: number,
    nome: string,
    tipo: TipoCliente,
    documento: string,
    endereco: string,
    status: StatusCliente
}