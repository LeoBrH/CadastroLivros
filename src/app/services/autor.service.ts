import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';

@Injectable({ providedIn: 'root' })
export class AutorService {
  private apiUrl = 'https://localhost:7200/livrosapi/autor';

  constructor(private http: HttpClient) {}

  listaAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  buscaAutor(cod: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${cod}`);
  }

  insereAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  editaAutor(cod: number, autor: Autor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cod}`, autor);
  }

  deletaAutor(cod: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cod}`);
  }
}