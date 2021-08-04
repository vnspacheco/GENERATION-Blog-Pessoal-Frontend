import { TemaModel } from './../model/TemaModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema (): Observable<TemaModel[]> {
    return this.http.get<TemaModel[]>('https://viniciuspacheco.herokuapp.com/tema', this.token)
  }

  postTema (tema: TemaModel): Observable<TemaModel> {
    return this.http.post<TemaModel>('https://viniciuspacheco.herokuapp.com/tema', tema, this.token)
  }
}
