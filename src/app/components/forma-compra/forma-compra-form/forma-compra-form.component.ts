import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormaCompraService } from '../../../services/forma-compra.service';

@Component({
  standalone: true,
  selector: 'app-forma-compra-form',
  templateUrl: './forma-compra-form.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class FormaCompraFormComponent implements OnInit {
  formaCompraForm: FormGroup;
  isEditMode = false;
  formaCompraCodFc!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formaCompraService: FormaCompraService
  ) {
    this.formaCompraForm = this.fb.group({
      codFC: [0],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formaCompraCodFc = Number(this.route?.snapshot?.paramMap?.get('cod') ?? 0);
    if (this.formaCompraCodFc) {
      this.isEditMode = true;
      this.loadFormaCompra();
    }
  }

  loadFormaCompra(): void {
    this.formaCompraService.buscaFormaCompra(this.formaCompraCodFc).subscribe((formaCompra) => {
      this.formaCompraForm.patchValue({
        codFC: formaCompra.codFC,
        descricao: formaCompra.descricao,
      });
    });
  }

  onSubmit(): void {
    if (this.formaCompraForm.invalid) return;

    if (this.isEditMode) {
      this.formaCompraService
        .editaFormaCompra(this.formaCompraCodFc, this.formaCompraForm.value).subscribe(() => {
          alert('Forma de Compra atualizada com sucesso!');
          this.router.navigate(['/forma-compra']);
        });
    } else {
      this.formaCompraService.insereFormaCompra(this.formaCompraForm.value).subscribe(() => {
        alert('Forma de Compra cadastrada com sucesso!');
        this.router.navigate(['/forma-compra']);
      });
    }
  }
}
