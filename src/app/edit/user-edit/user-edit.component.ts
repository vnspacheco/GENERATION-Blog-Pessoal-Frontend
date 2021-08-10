import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioModel } from 'src/app/model/UsuarioModel';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel()
  idUser: number
  confirmarSenha1: string
  tipoDeUsuario1: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmarSenha (event: any) {
    this.confirmarSenha1 = event.target.value
  }

  tipoDeUsuario (event: any) {
    this.tipoDeUsuario1 = event.target.value
  }

  atualizar () {
    this.usuario.tipo = this.tipoDeUsuario1

    if (this.usuario.senha != this.confirmarSenha1) {
      this.alertas.showAlertDanger('As senhas estão diferentes.')
    }
    else {
      this.authService.alterar(this.usuario).subscribe((resp: UsuarioModel) => {
      this.usuario = resp
      this.router.navigate(['/inicio'])
      this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente')
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0

      this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser (id: number) {
    this.authService.getByIdUser(id).subscribe((resp: UsuarioModel)=>{
      this.usuario = resp
    })
  }

}
