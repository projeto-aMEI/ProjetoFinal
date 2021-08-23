import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://amei3.herokuapp.com/postagens')
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://amei3.herokuapp.com/postagens/${id}`)
  }

  //pesquisa postagens
  getByTituloPostagem(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://amei3.herokuapp.com/postagens/titulo/${titulo}`)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://amei3.herokuapp.com/postagens/postar', postagem)
  }

  putPostagem(postagem: Postagem) : Observable<Postagem>{
    return this.http.put<Postagem>('https://amei3.herokuapp.com/postagens/editar', postagem)
  }

  deletePostagem(id: number){
    return this.http.delete(`https://amei3.herokuapp.com/postagens/deletar/${id}`)
  }

  //curtidas
  putCurtir(id: number): Observable<Postagem> {
    return this.http.put<Postagem>(`https://amei3.herokuapp.com/postagens/likes/${id}`, this.token)
  }

  putDescurtir(id: number): Observable<Postagem> {
    return this.http.put<Postagem>(`https://amei3.herokuapp.com/postagens/dislikes/${id}`, this.token)
  }

  /*
  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('http://localhost:8080/postagens')
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`http://localhost:8080/postagens/${id}`)
  }

  //pesquisa postagens
  getByTituloPostagem(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`http://localhost:8080/postagens/titulo/${titulo}`)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('http://localhost:8080/postagens/postar', postagem)
  }

  putPostagem(postagem: Postagem) : Observable<Postagem>{
    return this.http.put<Postagem>('http://localhost:8080/postagens/editar', postagem)
  }

  deletePostagem(id: number){
    return this.http.delete(`http://localhost:8080/postagens/deletar/${id}`)
  }

  //curtidas
  putCurtir(id: number): Observable<Postagem> {
    return this.http.put<Postagem>(`http://localhost:8080/postagens/likes/${id}`, this.token)
  }

  putDescurtir(id: number): Observable<Postagem> {
    return this.http.put<Postagem>(`http://localhost:8080/postagens/dislikes/${id}`, this.token)
  }*/
}
