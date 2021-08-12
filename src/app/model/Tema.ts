import { Postagem } from "./Postagem";

export class Tema {
  public id: number;
  public descricao: string;
  public keyword: string;
  public nome: string;
  public postagem: Postagem[]; //uma lista de postagens/ array pq temos varias postagem para um tema relacão ManyToOne
  //public qtdTema: number;
}
