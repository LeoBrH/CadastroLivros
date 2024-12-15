import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaCompra } from '../models/forma-compra.model';

@Injectable({ providedIn: 'root' })
export class FormaCompraService {
  private apiUrl = 'https://localhost:7200/livrosapi/Forma_Compra';

  constructor(private http: HttpClient) {}

  listaFormaCompra(): Observable<FormaCompra[]> {
    return this.http.get<FormaCompra[]>(this.apiUrl);
  }

  buscaFormaCompra(cod: number): Observable<FormaCompra> {
    return this.http.get<FormaCompra>(`${this.apiUrl}/${cod}`);
  }

  insereFormaCompra(formaCompra: FormaCompra): Observable<FormaCompra> {
    return this.http.post<FormaCompra>(this.apiUrl, formaCompra);
  }

  editaFormaCompra(cod: number, formaCompra: FormaCompra): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cod}`, formaCompra);
  }

  deletaFormaCompra(cod: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cod}`);
  }
}
