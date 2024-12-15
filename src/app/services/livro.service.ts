import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';
import { LivroValor } from '../models/livro-valor.model';
import { Assunto } from '../models/assunto.model';
import { Autor } from '../models/autor.model';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private apiUrl = 'https://localhost:7200/livrosapi/livro';

  constructor(private http: HttpClient) {}

  listaLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  buscaLivro(cod: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${cod}`);
  }

  insereLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  editaLivro(cod: number, livro: Livro): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cod}`, livro);
  }

  deletaLivro(cod: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cod}`);
  }
  

  buscaLivroAutor(codl: number): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.apiUrl}/${codl}/LivroAutor`);
  }

  insereAutor(codl: number, codAu: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${codl}/LivroAutor/${codAu}`, {});
  }

  removeAutor(codl: number, codAu: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codl}/LivroAutor/${codAu}`);
  }

  buscaLivroAssunto(codl: number): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.apiUrl}/${codl}/LivroAssunto`);
  }

  insereAssunto(codl: number, codAs: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${codl}/LivroAssunto/${codAs}`, {});
  }

  removeAssunto(codl: number, codAs: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codl}/LivroAssunto/${codAs}`);
  }

  buscaLivroValores(codl: number): Observable<LivroValor[]> {
    return this.http.get<LivroValor[]>(`${this.apiUrl}/${codl}/LivroValor`);
  }

  insereValor(codl: number, codFC: number, valor: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${codl}/LivroValor/${codFC}`, valor);
  }

  removeValor(codl: number, codFC: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codl}/LivroValor/${codFC}`);
  }
}