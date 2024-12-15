import { Component, OnInit } from '@angular/core';
import { AssuntoService } from '../../services/assunto.service';
import { Assunto } from '../../models/assunto.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  imports: [CommonModule, RouterModule]
})
export class AssuntoComponent implements OnInit {
  assuntos: Assunto[] = [];

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit(): void {
    this.loadAssuntos();
  }

  loadAssuntos(): void {
    this.assuntoService.listaAssuntos().subscribe((data) => {
      this.assuntos = data;
    });
  }

  onDelete(codAs: number): void {
    if (confirm('Tem certeza que deseja excluir este assunto?')) {
      this.assuntoService.deletaAssunto(codAs).subscribe(() => {
        alert('Assunto excluído com sucesso!');
        this.loadAssuntos();
      });
    }
  }
}
