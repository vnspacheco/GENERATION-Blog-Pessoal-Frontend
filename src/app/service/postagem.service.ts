import { PostagemModel } from './../model/PostagemModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPortagens (): Observable<PostagemModel[]> {
    return this.http.get<PostagemModel[]>(environment.urlBackEnd +'postagem', this.token)
  }

  postPostagem (postagem: PostagemModel): Observable<PostagemModel> {
    return this.http.post<PostagemModel>(environment.urlBackEnd +'postagem', postagem, this.token)
  }



}
