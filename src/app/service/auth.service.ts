import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   //registrar(user: User) {
  //   throw new Error('Method not implemented.');
   //}

  constructor(
    private http: HttpClient
  ) { }

  getAllUsuarios(): Observable<User[]> {
    return this.http.get<User[]>('https://amei3.herokuapp.com/usuarios/todos')
  }

  entrar(userLogin: UserLogin): Observable <UserLogin>{
    return this.http.post<UserLogin>('https://amei3.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable <User>{
    return this.http.post<User>('https://amei3.herokuapp.com/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://amei3.herokuapp.com/usuarios/${id}`)
  }

  putUsuario(user: User): Observable<User> {
    return this.http.put<User>('https://amei3.herokuapp.com/usuarios/alterar', user)
  }
  /*
  entrar(userLogin: UserLogin): Observable <UserLogin>{
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable <User>{
    return this.http.post<User>('http://localhost:8080/usuarios/cadastrar', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`)
  }

  putUsuario(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:8080/usuarios/alterar', user)
  }*/
  logado(){
    let ok: boolean = false;

    if(environment.token != '') {
      ok = true
    }
    return ok
  }

}
