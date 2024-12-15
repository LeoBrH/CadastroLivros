import { Component, OnInit } from '@angular/core';
import { FormaCompraService } from '../../services/forma-compra.service';
import { FormaCompra } from '../../models/forma-compra.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forma-compra',
  templateUrl: './forma-compra.component.html',
  imports: [CommonModule, RouterModule]
})
export class FormaCompraComponent implements OnInit {
  formasCompra: FormaCompra[] = [];

  constructor(private formaCompraService: FormaCompraService) {}

  ngOnInit(): void {
    this.loadFormasCompra();
  }

  loadFormasCompra(): void {
    this.formaCompraService.listaFormaCompra().subscribe((data) => {
      this.formasCompra = data;
    });
  }

  onDelete(codFc: number): void {
    if (confirm('Tem certeza que deseja excluir esta forma de compra?')) {
      this.formaCompraService.deletaFormaCompra(codFc).subscribe(() => {
        alert('Forma de Compra excluída com sucesso!');
        this.loadFormasCompra();
      });
    }
  }
}
