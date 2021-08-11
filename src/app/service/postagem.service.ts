import { PostagemModel } from 'src/app/model/PostagemModel';
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

  getAllPostagens (): Observable<PostagemModel[]> {
    return this.http.get<PostagemModel[]>(environment.urlBackEnd +'postagem', this.token)
  }

  getByIdPostagem (id: number): Observable<PostagemModel> {
    return this.http.get<PostagemModel>(environment.urlBackEnd +`postagem/${id}`, this.token)
  }

  getByTituloPostagem (titulo: string): Observable<PostagemModel[]> {
    return this.http.get<PostagemModel[]>(environment.urlBackEnd +`postagem/titulo/${titulo}`, this.token)
  }

  postPostagem (postagem: PostagemModel): Observable<PostagemModel> {
    return this.http.post<PostagemModel>(environment.urlBackEnd +'postagem', postagem, this.token)
  }

  putPostagem (postagem: PostagemModel): Observable<PostagemModel> {
    return this.http.put<PostagemModel>(environment.urlBackEnd +'postagem', postagem, this.token)
  }

  deletePostagem (id: number) {
    return this.http.delete(environment.urlBackEnd +`postagem/${id}`, this.token)
  }

}
