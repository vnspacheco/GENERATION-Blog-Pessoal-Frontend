import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLoginModel } from '../model/UsuarioLoginModel';
import { UsuarioModel } from '../model/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar (usuarioLogin: UsuarioLoginModel): Observable<UsuarioLoginModel> {
    return this.http.post<UsuarioLoginModel>('https://viniciuspacheco.herokuapp.com/usuarios/logar', usuarioLogin)
  }

  cadastrar (usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>('https://viniciuspacheco.herokuapp.com/usuarios/cadastrar', usuario)
  }
}
