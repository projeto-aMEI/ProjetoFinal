import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]


  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  id: number


  user: User = new User()
  idUser = environment.id

  //ordena as postagens
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
  }
  let id = this.route.snapshot.params['id']
  this.findByIdUser(id)
  this.getAllTemas()
  this.getAllPostagens()
  console.log('isso funciona')
}


  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
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

  //contato

  btnWhatsapp(id: string, titulo2: string){
    let usuario = id
    let titulo = titulo2
    window.open('https://wa.me/' + usuario + '?text='  + 'Olá ' + titulo + ' vi você no aMEI, e queria iniciar uma conversa :D', "_blank")
  }

  btnLinkedin(id: string){
    let usuario = id
    window.open(usuario)
  }

  btnGithub(id: string){
    let usuario = id
    window.open(usuario)
  }

}

