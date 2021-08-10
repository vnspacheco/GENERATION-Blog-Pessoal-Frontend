import { AlertasService } from './../service/alertas.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { UsuarioModel } from './../model/UsuarioModel';
import { TemaModel } from './../model/TemaModel';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { PostagemModel } from './../model/PostagemModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaPostagens: PostagemModel[]
  postagem: PostagemModel = new PostagemModel()

  tema: TemaModel = new TemaModel
  listaTemas: TemaModel[]
  idTema: number

  user: UsuarioModel = new UsuarioModel
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router : Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas () {
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema () {
    return this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel)=>{
      this.tema = resp
    })
  }

  getAllPostagens () {
    this.postagemService.getAllPostagens().subscribe((resp: PostagemModel[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser () {
    this.authService.getByIdUser(this.idUser).subscribe((resp: UsuarioModel)=>{
      this.user = resp
    })
  }

  publicar () {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: PostagemModel)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new PostagemModel()
      this.getAllPostagens()
    })
  }
}
