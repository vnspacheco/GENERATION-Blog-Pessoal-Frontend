import { TemaService } from './../service/tema.service';
import { TemaModel } from './../model/TemaModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  listaTemas: TemaModel[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    if (environment.tipo != 'adm') {
      this.alertas.showAlertInfo('Você precisa ser adm para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas () {
    this.temaService.getAllTema().subscribe((resp: TemaModel[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar () {
    this.temaService.postTema(this.tema).subscribe((resp: TemaModel)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new TemaModel()
    })
  }

}
