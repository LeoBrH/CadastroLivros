import { Routes } from '@angular/router';
import { LivroComponent } from './components/livro/livro.component';
import { LivroFormComponent } from './components/livro/livro-form/livro-form.component';
import { AutorComponent } from './components/autor/autor.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AssuntoComponent } from './components/assunto/assunto.component';
import { AssuntoFormComponent } from './components/assunto/assunto-form/assunto-form.component';
import { FormaCompraComponent } from './components/forma-compra/forma-compra.component';
import { FormaCompraFormComponent } from './components/forma-compra/forma-compra-form/forma-compra-form.component';
import { LivroGerenciamentoComponent } from './components/livro/livro-gerenciamento/livro-gerenciamento.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/livro', pathMatch: 'full' },

  { path: 'livro', component: LivroComponent },
  { path: 'livro/novo', component: LivroFormComponent },
  { path: 'livro/editar/:cod', component: LivroFormComponent },
  { path: 'livro/gerenciamento/:cod', component: LivroGerenciamentoComponent },
  { path: 'livro/relatorio', component: RelatorioComponent },

  { path: 'autor', component: AutorComponent },
  { path: 'autor/novo', component: AutorFormComponent },
  { path: 'autor/editar/:cod', component: AutorFormComponent },

  { path: 'assunto', component: AssuntoComponent },
  { path: 'assunto/novo', component: AssuntoFormComponent },
  { path: 'assunto/editar/:cod', component: AssuntoFormComponent },

  { path: 'forma-compra', component: FormaCompraComponent },
  { path: 'forma-compra/novo', component: FormaCompraFormComponent },
  { path: 'forma-compra/editar/:cod', component: FormaCompraFormComponent },
];
