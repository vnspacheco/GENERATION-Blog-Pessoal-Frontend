import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { UsuarioLoginModel } from './../model/UsuarioLoginModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLoginModel = new UsuarioLoginModel()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar () {
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLoginModel) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id

      this.router.navigate(['/inicio'])
    }, erro => {
      if (erro.status == 500){
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }
}
