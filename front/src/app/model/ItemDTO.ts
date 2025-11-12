import { Produto } from "./Produto";

export interface ItemDTO {
  quantidade: number;
  subTotal: number;
  produto: Produto;
}