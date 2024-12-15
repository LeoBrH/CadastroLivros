import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LivroValor } from '../models/livro-valor.model';

@Injectable({ providedIn: 'root' })
export class LivroValorService {
  private apiUrl = 'https://localhost:7200/livrosapi/livro-valor';

  constructor(private http: HttpClient) {}

  buscaLivroValores(): Observable<LivroValor[]> {
    return this.http.get<LivroValor[]>(this.apiUrl);
  }

  insereLivroValor(livroValor: LivroValor): Observable<LivroValor> {
    return this.http.post<LivroValor>(this.apiUrl, livroValor);
  }

  deletaLivroValor(cod: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cod}`);
  }
}