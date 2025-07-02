import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void{
    this.message = '';
    this. isSuccess = false;

    if (!this.email || !this.senha){
      this.message = "Por favor, preencha o email e a senha";
      this.isSuccess = false;
      return;
    }

    const loginData ={
      email: this.email,
      senha: this.senha
    };

    console.log('Tentando com: ', loginData);

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.message = res.message || 'Login realizado com sucesso!'
        this.isSuccess = true;
        
        this.router.navigate(['/mfe']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSuccess = false;
        console.error("Erro na requisição (frontend catch): ", err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else if (err.status === 401) {
          this.message = "Email ou senha incorretos."
        } else if (err.status === 400) {
          this.message = "Dados incompletos."
        } else {
        this.message = `Erro do servidor: ${err.status} - ${err.statusText ||  'Erro desconhecido'}`
        }
         
      }
    });
    
  }
}
