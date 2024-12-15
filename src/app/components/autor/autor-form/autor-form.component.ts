import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutorService } from '../../../services/autor.service';

@Component({
  standalone: true,
  selector: 'app-autor-form',
  templateUrl: './autor-form.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class AutorFormComponent implements OnInit {
  autorForm: FormGroup;
  isEditMode = false;
  autorCodAu!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private autorService: AutorService
  ) {
    this.autorForm = this.fb.group({
      codAu: [0],
      nome: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.autorCodAu = Number(this.route?.snapshot?.paramMap?.get('cod') ?? 0);
    if (this.autorCodAu) {
      this.isEditMode = true;
      this.loadAutor();
    }
  }

  loadAutor(): void {
    this.autorService.buscaAutor(this.autorCodAu).subscribe((autor) => {
      this.autorForm.patchValue({
        codAu: autor.codAu,
        nome: autor.nome,
      });
    });
  }

  onSubmit(): void {
    if (this.autorForm.invalid) return;

    if (this.isEditMode) {
      this.autorService.editaAutor(this.autorCodAu, this.autorForm.value).subscribe(() => {
          alert('Autor atualizado com sucesso!');
          this.router.navigate(['/autor']);
        });
    } else {
      this.autorService.insereAutor(this.autorForm.value).subscribe(() => {
        alert('Autor cadastrado com sucesso!');
        this.router.navigate(['/autor']);
      });
    }
  }
}
