import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../models/autor.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  imports: [CommonModule, RouterModule]
})
export class AutorComponent implements OnInit {
  autores: Autor[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    this.autorService.listaAutores().subscribe((data) => {
      this.autores = data;
    });
  }

  onDelete(codAu: number): void {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.autorService.deletaAutor(codAu).subscribe(() => {
        alert('Autor excluído com sucesso!');
        this.loadAutores();
      });
    }
  }
}
