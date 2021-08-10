import { TemaService } from 'src/app/service/tema.service';
import { TemaModel } from 'src/app/model/TemaModel';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostagemModel } from 'src/app/model/PostagemModel';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: PostagemModel = new PostagemModel()

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem (id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: PostagemModel)=>{
      this.postagem = resp
    })
  }

  atualizar () {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: PostagemModel)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

  findByIdTema () {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: TemaModel)=>{
      this.tema = resp
    })
  }

  findAllTemas () {
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }

}
