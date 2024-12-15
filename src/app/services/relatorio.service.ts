import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private apiUrl = 'https://localhost:7200/livrosapi/livro/relatorio';

  constructor(private http: HttpClient) { }

  buscaRelatorioLivros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
