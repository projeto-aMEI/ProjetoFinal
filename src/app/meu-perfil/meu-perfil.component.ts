import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string

  user: User = new User()
  idUser = environment.id

  //id para o user.edit
  id = environment.id

  //Dados usuario do card
  nome = environment.nome
  sobrenome = environment.sobrenome
  email = environment.email
  foto = environment.foto
  descricaoPerfil = environment.descricaoPerfil
  dataNascimento = environment.dataNascimento
  razaoSocial = environment.razaoSocial
  numero = environment.numero
  github = environment.github
  linkedin = environment.linkedin

  //ordena as postagens
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.alertas.showAlertDanger('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdUser()
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }
  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }
  //Exibir publis
  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  //Postagem publi
  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  btnWhatsapp(id: string, titulo2: string) {
    let usuario = id
    let titulo = titulo2
    window.open('https://wa.me/' + usuario + '?text=' + 'Olá, ' + titulo + '! Vi você no aMEI, e queria iniciar uma conversa :D', "_blank")
  }

  btnLinkedin(id: string) {
    let usuario = id
    window.open(usuario)
  }

  btnGithub(id: string) {
    let usuario = id
    window.open(usuario)
  }

  //Pesquisa de publicações, ainda não implementado
  /*findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema(){
      if(this.nomeTema == ''){
        this.getAllTemas()
      } else {
        this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
          this.listaTemas = resp
        })
      }
    }*/

}
