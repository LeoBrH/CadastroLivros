import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../../services/relatorio.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  imports: [CommonModule, RouterModule]
})
export class RelatorioComponent implements OnInit {
  relatorio: any[] = [];

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.relatorioService.buscaRelatorioLivros().subscribe(data => {
      this.relatorio = data;
    });
  }

  salvarXLSX(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.relatorio.map(item => ({
      ...item,
      valor: `R$ ${item.valor}`
    })));
    const workbook = XLSX.utils.book_new();
    let colunas: string[] = ["Autor", "Título", "Editora", "Edição", "Ano Publicação", "Assunto", "Forma de Compra", "Valor"];
    XLSX.utils.sheet_add_aoa(worksheet, [colunas], { origin: "A1" });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Livros");
    XLSX.writeFile(workbook, "relatorio-livros.xlsx");
  }

  salvarPDF(): void {
    const doc = new jsPDF();
    const colunas = ["Autor", "Título", "Editora", "Edição", "Ano Publicação", "Assunto", "Forma de Compra", "Valor"];
    const rows = this.relatorio.map(item => [
      item.autor, item.titulo, item.editora, item.edicao, item.anoPublicacao, item.assunto, item.formaCompra, `R$ ${item.valor}`
    ]);
    doc.autoTable({
      head: [colunas],
      body: rows,
    });
    doc.save('relatorio-livros.pdf');
  }
}
