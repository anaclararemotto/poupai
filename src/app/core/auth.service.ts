import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  private readonly API = 'http://localhost:4000'

  constructor(private http: HttpClient) {}

  login(dados: { email: string; senha: string}) : Observable<any> {
    return this.http.post(`${this.API}/login`, dados).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  get token(): string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!this.token;
  }
}
