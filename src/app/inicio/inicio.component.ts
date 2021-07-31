import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {

    if(environment.token == '') {
      alert('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
  }
}
