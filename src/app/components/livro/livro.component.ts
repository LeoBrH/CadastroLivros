import { Component, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
    imports: [CommonModule, RouterModule]
})
export class LivroComponent implements OnInit {
  livros: Livro[] = [];

  constructor(
    private livroService: LivroService
  ) {}

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.livroService.listaLivros().subscribe((data) => {
      this.livros = data;
    });
  }
  
  onDelete(cod: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livroService.deletaLivro(cod).subscribe(() => {
        alert('Livro excluído com sucesso!');
        this.loadLivros();
      });
    }
  }
}