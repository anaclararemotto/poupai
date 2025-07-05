import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  onSubmit() {
    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    };

    this.authService.cadastrarUsuario(dados).subscribe({
      next: (res) => {
        console.log('Usuário cadastrado:', res);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar usuário.');
      },
    });
  }
}
