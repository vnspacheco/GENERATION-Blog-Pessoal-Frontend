import { TemaService } from 'src/app/service/tema.service';
import { Component, OnInit } from '@angular/core';
import { TemaModel } from 'src/app/model/TemaModel';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: TemaModel = new TemaModel()
  idTema: number

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

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema (id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: TemaModel)=>{
      this.tema = resp
    })
  }

  apagar () {
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      this.alertas.showAlertSuccess('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
