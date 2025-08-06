import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, BehaviorSubject, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:4000';
  private readonly MFE_HOME_URL = 'http://localhost:4201/home';

  private _currentToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public readonly currentToken$ = this._currentToken.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    console.group(
      'AuthService Initialization (Origin: ' + window.location.origin + ')'
    );

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this._currentToken.next(storedToken);
      console.log('AuthService: Token encontrado no localStorage e carregado.');
    } else {
      console.log(
        'AuthService: Nenhum token encontrado no localStorage na inicialização.'
      );

      this.checkTokenInUrlOnInit();
    }
    console.groupEnd();
  }

  private checkTokenInUrlOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      this._currentToken.next(tokenFromUrl);
      console.log(
        'AuthService: Token encontrado na URL e salvo no localStorage desta origem.'
      );

      this.router.navigate([], {
        queryParams: { token: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
  }

  get token(): string | null {
    const storedToken = localStorage.getItem('token');
    console.log(
      'AuthService Getter `token` (Origin: ' + window.location.origin + '):',
      storedToken ? storedToken.substring(0, 30) + '...' : 'NULO'
    );
    return storedToken;
  }

  login(dados: { email: string; senha: string }): Observable<any> {
    console.group('AuthService Login Attempt');
    console.log('AuthService: Tentando fazer login para email:', dados.email);

    return this.http.post(`${this.API}/auth/login`, dados).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this._currentToken.next(response.token);
          console.log(
            'AuthService: Login BEM-SUCEDIDO. Token salvo (origem ' +
              window.location.origin +
              ').'
          );

          window.location.href = `${this.MFE_HOME_URL}?token=${response.token}`;
        } else {
          console.warn(
            'AuthService: Login bem-sucedido, mas NENHUM token encontrado na resposta do backend.'
          );
          this._currentToken.next(null);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        console.groupEnd();
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('AuthService: ERRO no login:', error);
        localStorage.removeItem('token');
        this._currentToken.next(null);
        this.router.navigate(['/login']);
        console.groupEnd();
        return throwError(() => error);
      })
    );
  }

  cadastrarUsuario(dados: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<any> {
    console.group('AuthService Cadastrar Usuário');
    console.log('AuthService: Tentando cadastrar usuário.');
    console.groupEnd();
    return this.http.post(`${this.API}/auth`, dados);
  }

  logout(): void {
    console.group(
      'AuthService Logout (Origin: ' + window.location.origin + ')'
    );
    console.log(
      'AuthService: Realizando logout. Removendo token do localStorage e limpando BehaviorSubject.'
    );
    localStorage.removeItem('token');
    this._currentToken.next(null);
    this.router.navigate(['/login']);
    console.groupEnd();
  }

  isLoggedIn(): boolean {
    const tokenPresent = !!localStorage.getItem('token');
    const subjectValuePresent = !!this._currentToken.getValue();

    const loggedIn = tokenPresent && subjectValuePresent;
    console.log(
      'AuthService `isLoggedIn()` (Origin: ' + window.location.origin + '):',
      'Token no localStorage:',
      tokenPresent,
      ' | BehaviorSubject tem valor:',
      subjectValuePresent,
      ' | Status final:',
      loggedIn
    );
    return loggedIn;
  }

  getUserIdFromToken(): string | null {
    console.group('AuthService getUserIdFromToken');
    const token = this.token;
    if (!token) {
      console.warn(
        'AuthService: getUserIdFromToken() chamado, mas token é NULO.'
      );
      console.groupEnd();
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log(
        'AuthService: Token decodificado. Sub (ID do usuário):',
        decodedToken.sub
      );
      console.groupEnd();
      return decodedToken.sub;
    } catch (error) {
      console.error(
        'AuthService: Erro ao decodificar o token. Removendo token inválido.',
        error
      );
      localStorage.removeItem('token');
      this._currentToken.next(null);
      console.groupEnd();
      return null;
    }
  }
}
