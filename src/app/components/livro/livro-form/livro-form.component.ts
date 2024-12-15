import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LivroService } from '../../../services/livro.service';

@Component({
  standalone: true,
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
  
})
export class LivroFormComponent implements OnInit {
  livroForm: FormGroup;
  isEditMode = false;
  livroCodl!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService
  ) {
    this.livroForm = this.fb.group({
      codl: [0],
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: [0, Validators.required],
      anoPublicacao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.livroCodl = Number(this.route?.snapshot?.paramMap?.get('cod') ?? 0);
    if (this.livroCodl) {
      this.isEditMode = true;
      this.loadLivro();
    }
  }

  loadLivro(): void {
    this.livroService.buscaLivro(this.livroCodl).subscribe((livro) => {
      this.livroForm.patchValue({
        codl: livro.codl,
        titulo: livro.titulo,
        editora: livro.editora,
        edicao: livro.edicao,
        anoPublicacao: livro.anoPublicacao,
      });
    });
  }

  onSubmit(): void {
    if (this.livroForm.invalid) return;

    if (this.isEditMode) {
      this.livroService.editaLivro(this.livroCodl, this.livroForm.value).subscribe(() => {
          alert('Livro atualizado com sucesso!');
          this.router.navigate(['/livro']);
        });
    } else {
      this.livroService.insereLivro(this.livroForm.value).subscribe(() => {
        alert('Livro cadastrado com sucesso!');
        this.router.navigate(['/livro']);
      });
    }
  }
}
