import { Component } from '@angular/core';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-tela-principal',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './tela-principal.component.html',
})
export class TelaInicialComponent {

}
