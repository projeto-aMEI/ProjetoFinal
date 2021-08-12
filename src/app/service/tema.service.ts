import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://amei3.herokuapp.com/temas')
  }


  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`https://amei3.herokuapp.com/temas/${id}`)
  }

  getByNomeTema(nome: string): Observable<Tema[]> {
    return this.http.get<Tema[]>(`https://amei3.herokuapp.com/temas/${nome}`)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://amei3.herokuapp.com/temas/postar', tema)
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>('https://amei3.herokuapp.com/temas/editar', tema)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://amei3.herokuapp.com/deletar/${id}`)
  }
}
