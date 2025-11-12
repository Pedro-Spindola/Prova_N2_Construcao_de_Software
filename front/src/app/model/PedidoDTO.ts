import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";
import { ItemDTO } from "./ItemDTO";

export interface PedidoDTO {
  id: number;
  total: number;
  troco: number;
  cliente: Cliente;
  usuario: Funcionario;
  itensComprados: ItemDTO[];
  data: string;
}