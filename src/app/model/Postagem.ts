import { Tema } from "./Tema";
import { User } from "./User";

export class Postagem{
  public id: number;
  public descricaoPost: string;
  public hashtag: string;
  public imgpost: string;
  public titulo: string;
  public date: Date;
  public curtidas: number;
  public usuario: User;
  public tema: Tema; //temos 1 tema para varias postagens relação OneToMany



}
