import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaInicialComponent } from "./components/tela-principal/tela-principal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss'],
  imports: [TelaInicialComponent]
})
export class AppComponent {
  title = 'Cadastro Livros';
}
