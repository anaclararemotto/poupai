import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  email!: string;
  senha!: string;
  rememberMe: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any): void {
    this.message = '';
    this.isSuccess = false;

    if (form.invalid) {
      this.message = 'Por favor, preencha os campos corretamente.';
      return;
    }

    const loginData = {
      email: this.email,
      senha: this.senha,
    };

    console.log('LoginForm: Tentando fazer login com: ', loginData);

    this.authService.login(loginData).subscribe({
      next: (res) => {
        console.log(
          'LoginForm: Login request completed. AuthService is handling navigation.'
        );
        this.message = res.message || 'Login realizado com sucesso!';
        this.isSuccess = true;
      },
      error: (err: HttpErrorResponse) => {
        this.isSuccess = false;
        console.error('LoginForm: Erro na requisição (frontend catch): ', err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else if (err.status === 401) {
          this.message = 'Email ou senha incorretos.';
        } else if (err.status === 400) {
          this.message = 'Dados incompletos.';
        } else {
          this.message = `Erro do servidor: ${err.status} - ${
            err.statusText || 'Erro desconhecido'
          }`;
        }
      },
    });
  }
}
