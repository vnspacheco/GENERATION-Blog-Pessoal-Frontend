import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginModel } from '../model/UsuarioLoginModel';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  entrar (usuarioLogin: UsuarioLoginModel): Observable<UsuarioLoginModel> {
    return this.http.post<UsuarioLoginModel>(environment.urlBackEnd + 'usuarios/logar', usuarioLogin)
  }

  cadastrar (usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(environment.urlBackEnd + 'usuarios/cadastrar', usuario)
  }

  getByIdUser (id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(environment.urlBackEnd + `usuarios/${id}`)
  }

  logado () {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }
}
