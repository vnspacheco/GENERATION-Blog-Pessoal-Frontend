import { TemaService } from './../service/tema.service';
import { TemaModel } from './../model/TemaModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

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
    private temaService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
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
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new TemaModel()
    })
  }

}
