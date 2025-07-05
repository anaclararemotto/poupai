import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
})
export class SignupForm {
  nome = '';
  email = '';
  senha = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  onSubmit() {

    this.message = '';
    this.isSuccess = false;

    if (!this.nome || !this.email || !this.senha) {
      this.message = 'Por favor, preencha todos os campos.';
      return;
    }


    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };

    this.authService.cadastrarUsuario(dados).subscribe({
      next: (res) => {
        this.message = res.message || 'Cadastro realizado com sucesso!';
        this.isSuccess = true;
        console.log('Usuário cadastrado:', res);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSuccess = false;
        console.error('Erro ao cadastrar (frontend catch):', err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else if (err.status === 400) {
          this.message = 'Dados inválidos ou incompletos.';
        } else if (err.status === 409) {
          this.message = 'Este email já está em uso.';
        } else {
          this.message = `Erro do servidor: ${err.status} - ${err.statusText || 'Erro desconhecido'}`;
        }
      },
    });
  }
}
