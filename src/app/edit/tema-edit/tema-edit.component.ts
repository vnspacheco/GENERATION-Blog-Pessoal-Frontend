import { Component, OnInit } from '@angular/core';
import { TemaService } from 'src/app/service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaModel } from 'src/app/model/TemaModel';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: TemaModel = new TemaModel()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema (id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: TemaModel)=>{
      this.tema = resp
    })
  }

  atualizar () {
    this.temaService.putTema(this.tema).subscribe((resp: TemaModel)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
