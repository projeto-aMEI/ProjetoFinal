import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  id = environment.id

  nome = environment.nome
  sobrenome = environment.sobrenome
  email = environment.email
  foto = environment.foto
  numero = environment.numero
  descricaoPerfil = environment.descricaoPerfil
  dataNascimento = environment.dataNascimento
  razaoSocial = environment.razaoSocial

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão divergentes, tente novamente!')
    } else {
      this.authService.putUsuario(this.user).subscribe((resp: User) => {
        this.alertas.showAlertSuccess('Usuário alterado com sucesso!')
        this.user = resp
        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

}
