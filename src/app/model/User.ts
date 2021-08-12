import { Postagem } from "./Postagem";

export class User{
  public id: number;
  public nome: string;
  public razaoSocial: string;
  public email: string;
  public senha: string;
  public descricaoPerfil: string;
  public dataNascimento: Date;
  public postagem: Postagem[]; //array/lista de postagens , varias postagens para um usuario relação ManytoOne
  public foto: string;
  public tipo: string;
  //public admin: boolean

}
