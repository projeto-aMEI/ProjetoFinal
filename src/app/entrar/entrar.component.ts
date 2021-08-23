import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.sobrenome = this.userLogin.sobrenome
      environment.email = this.userLogin.email
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.descricaoPerfil = this.userLogin.descricaoPerfil
      environment.dataNascimento = this.userLogin.dataNascimento
      environment.razaoSocial = this.userLogin.razaoSocial
      environment.numero = this.userLogin.numero
      environment.linkedin = this.userLogin.linkedin
      environment.github = this.userLogin.github

      // exibe no console
      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.descricaoPerfil)
      console.log(environment.foto)
      // console.log(environment.razaoSocial)

      this.router.navigate(['/inicio'])
    }, erro => {
      if (erro.status == 500) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }
    })
  }
}
