import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../model/UsuarioModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel
  confirmarSenha1: string
  tipoDeUsuario1: string

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha (event: any) {
    this.confirmarSenha1 = event.target.value
  }

  tipoDeUsuario (event: any) {
    this.tipoDeUsuario1 = event.target.value
  }

  cadastrar () {
    this.usuario.tipo = this.tipoDeUsuario1

    if (this.usuario.senha != this.confirmarSenha1) {
      alert('As senhas estão diferentes.')
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
      this.router.navigate(['/entrar'])
      alert('Usuário cadastrado com sucesso!')
      })
    }
  }
}
