import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto } from '../models/assunto.model';

@Injectable({ providedIn: 'root' })
export class AssuntoService {
  private apiUrl = 'https://localhost:7200/livrosapi/assunto';

  constructor(private http: HttpClient) {}

  listaAssuntos(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  buscaAssunto(cod: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.apiUrl}/${cod}`);
  }

  insereAssunto(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }

  editaAssunto(cod: number, assunto: Assunto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cod}`, assunto);
  }

  deletaAssunto(cod: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cod}`);
  }
}