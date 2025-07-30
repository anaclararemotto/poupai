import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  standalone: true, // <--- ADICIONE ESTA LINHA
})
export class SignupForm {
  nome = '';
  email = '';
  senha = '';
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.message = '';
    this.isSuccess = false;

    if (form.invalid) {
      this.message = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;

    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };

    this.authService.cadastrarUsuario(dados).subscribe({
      next: (res) => {
        this.message = res.message || 'Cadastro realizado com sucesso!';
        this.isSuccess = true;
        this.isLoading = false;
        console.log('Usuário cadastrado:', res);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSuccess = false;
        this.isLoading = false;
        this.isSuccess = false;
        console.error('Erro ao cadastrar (frontend catch):', err);

        if (err.status === 409 || (err.error && err.error.code === 11000)) {
          this.message =
            'Este email já está cadastrado. Por favor, use outro email.';
        } else if (err.error?.message) {
          this.message = err.error.message;
        } else if (err.status === 400) {
          this.message = 'Dados inválidos ou incompletos.';
        } else {
          this.message = `Erro do servidor: ${err.status} - ${
            err.statusText || 'Erro desconhecido'
          }`;
        }
      },
    });
  }
}
