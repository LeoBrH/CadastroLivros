import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AssuntoService } from '../../../services/assunto.service';

@Component({
  standalone: true,
  selector: 'app-assunto-form',
  templateUrl: './assunto-form.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class AssuntoFormComponent implements OnInit {
  assuntoForm: FormGroup;
  isEditMode = false;
  assuntoCodAs!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assuntoService: AssuntoService
  ) {
    this.assuntoForm = this.fb.group({
      codAs: [0],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.assuntoCodAs = Number(this.route?.snapshot?.paramMap?.get('cod') ?? 0);
    if (this.assuntoCodAs) {
      this.isEditMode = true;
      this.loadAssunto();
    }
  }

  loadAssunto(): void {
    this.assuntoService.buscaAssunto(this.assuntoCodAs).subscribe((assunto) => {
      this.assuntoForm.patchValue({
        codAs: assunto.codAs,
        descricao: assunto.descricao,
      });
    });
  }

  onSubmit(): void {
    if (this.assuntoForm.invalid) return;

    if (this.isEditMode) {
      this.assuntoService.editaAssunto(this.assuntoCodAs, this.assuntoForm.value).subscribe(() => {
          alert('Assunto atualizado com sucesso!');
          this.router.navigate(['/assunto']);
        });
    } else {
      this.assuntoService.insereAssunto(this.assuntoForm.value).subscribe(() => {
        alert('Assunto cadastrado com sucesso!');
        this.router.navigate(['/assunto']);
      });
    }
  }
}
