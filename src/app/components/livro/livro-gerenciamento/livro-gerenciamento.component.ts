import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../../services/livro.service';
import { AutorService } from '../../../services/autor.service';
import { AssuntoService } from '../../../services/assunto.service';
import { FormaCompraService } from '../../../services/forma-compra.service';
import { Livro } from '../../../models/livro.model';
import { Autor } from '../../../models/autor.model';
import { Assunto } from '../../../models/assunto.model';
import { FormaCompra } from '../../../models/forma-compra.model';
import { LivroValor } from '../../../models/livro-valor.model';

@Component({
  selector: 'app-livro-gerenciamento',
  templateUrl: './livro-gerenciamento.component.html',
  imports: [CommonModule, RouterModule, FormsModule]
})
export class LivroGerenciamentoComponent implements OnInit {
  livro: Livro | undefined;
  autores: Autor[] = [];
  autoresAdicionados: Autor[] = [];
  assuntos: Assunto[] = [];
  assuntosAdicionados: Assunto[] = [];
  formasCompra: FormaCompra[] = [];
  valoresAdicionados: LivroValor[] = [];
  selectedAutor: number | undefined;
  selectedAssunto: number | undefined;
  selectedFormaCompra: number | undefined;
  valorFormaCompra: number = 0;

  constructor(
    private route: ActivatedRoute,
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private formaCompraService: FormaCompraService
  ) {}

  ngOnInit(): void {
    const cod = Number(this.route.snapshot.paramMap.get('cod') ?? 0);
    this.livroService.buscaLivro(cod).subscribe((data) => {
        this.livro = data;
        this.loadAutoresAdicionados();
        this.loadAssuntosAdicionados();
        this.loadValoresAdicionados();
    });
  }

  loadAutores(): void {
        this.autorService.listaAutores().subscribe((data) => {
            this.autores = data.filter(autor => !this.autoresAdicionados.some(adicionado => adicionado.codAu === autor.codAu));
        });
    }

    loadAssuntos(): void {
        this.assuntoService.listaAssuntos().subscribe((data) => {
            this.assuntos = data.filter(assunto => !this.assuntosAdicionados.some(adicionado => adicionado.codAs === assunto.codAs));
        });
    }

    loadformasCompra(): void { 
        this.formaCompraService.listaFormaCompra().subscribe((data) => {
            this.formasCompra = data.filter(formaCompra => !this.valoresAdicionados.some(adicionado => adicionado.forma_Compra_CodFC === formaCompra.codFC));
        });
    }

  loadAutoresAdicionados(): void {
    if(this.livro)
    {
        this.livroService.buscaLivroAutor(this.livro.codl).subscribe((data) => {
            this.autoresAdicionados = data;
            this.loadAutores();
        });
    }
  }

  loadAssuntosAdicionados(): void {
    if(this.livro)
    {
        this.livroService.buscaLivroAssunto(this.livro.codl).subscribe((data) => {
            this.assuntosAdicionados = data;
            this.loadAssuntos();
        });
    }
  }

  loadValoresAdicionados(): void {
    if(this.livro)
    {
        this.livroService.buscaLivroValores(this.livro.codl).subscribe((data) => {
            this.valoresAdicionados = data;
            this.loadformasCompra();
        });
    }
  }

  vincularAutor(): void {
    if(this.livro && this.selectedAutor)
    {
        this.livroService.insereAutor(this.livro.codl, this.selectedAutor).subscribe(() => {
           alert('Autor vinculado com sucesso!');
           this.selectedAutor = undefined;
           this.loadAutoresAdicionados();
        });
    }
    else
        alert('Nenhum autor selecionado ou livro não definido!');
  }

  desvincularAutor(codAu:number): void {
    if (this.livro && codAu) {
      this.livroService.removeAutor(this.livro.codl, codAu).subscribe(() => {
        alert('Autor desvinculado com sucesso!');
           this.selectedAutor = undefined;
           this.loadAutoresAdicionados();
      });
    } 
    else
        alert('Nenhum autor selecionado ou livro não definido!');
  }

  vincularAssunto(): void {
    if(this.livro && this.selectedAssunto) 
    {
       this.livroService.insereAssunto(this.livro.codl, this.selectedAssunto).subscribe(() => {
          alert('Assunto vinculado com sucesso!');
           this.selectedAssunto = undefined;
           this.loadAssuntosAdicionados();
        });
    }
    else
        alert('Nenhum assunto selecionado ou livro não definido!');
  }

  desvincularAssunto(codAs:number): void {
    if (this.livro && codAs) {
      this.livroService.removeAssunto(this.livro.codl, codAs).subscribe(() => {
        alert('Assunto desvinculado com sucesso!');
           this.selectedAssunto = undefined;
           this.loadAssuntosAdicionados();
    });
    } 
    else
      alert('Nenhum assunto selecionado ou livro não definido!');
  }

  vincularValor(): void {
    if(this.livro && this.selectedFormaCompra && this.valorFormaCompra) 
    {
        this.livroService.insereValor(this.livro.codl, this.selectedFormaCompra, this.valorFormaCompra).subscribe(() => {
            alert('Valor para forma de compra vinculada com sucesso!');
           this.selectedFormaCompra = undefined;
           this.loadValoresAdicionados();
        });
    }
    else
        alert('Nenhuma forma de compra selecionada, valor não preenchido ou livro não definido!');
  }

  desvincularValor(codFC:number): void {
    if (this.livro && codFC) {
      this.livroService.removeValor(this.livro.codl, codFC).subscribe(() => {
        alert('Valor desvinculado com sucesso!');
           this.selectedFormaCompra = undefined;
           this.loadValoresAdicionados();
    });
    } 
    else
      alert('Nenhum valor selecionado ou livro não definido!');
  }

  formatarMoeda(event: any): void {
    const value = event.target.value.replace(/\D/g, '');
    this.valorFormaCompra = parseFloat(value) / 100 || 0;
    event.target.value = value.replace(/(\d)(\d{2})$/, '$1,$2')
                        .replace(/(?=(\d{3})+(\D))\B/g, '.');

  }
}
