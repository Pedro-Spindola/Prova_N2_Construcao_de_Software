import { PerfilUsuario } from "./enums/PerfilUsuario";
import { StatusUsuario } from "./enums/StatusUsuario";

export interface Funcionario{
    id: number,
    nome: string,
    email: string,
    senha: string,
    perfil: PerfilUsuario,
    status: StatusUsuario
}