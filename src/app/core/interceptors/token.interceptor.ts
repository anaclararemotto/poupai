import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
export const tokenInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const token = auth.token;

  console.log(
    'Interceptor: Tentando obter token. Token atual:',
    token ? token.substring(0, 30) + '...' : 'NULO'
  );

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log(
      'Interceptor: Token adicionado ao cabeçalho para URL:',
      authReq.url
    );
  } else {
    console.log(
      'Interceptor: Nenhum token encontrado, requisição prosseguindo sem Authorization header para URL:',
      req.url
    );
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.error(
          'Interceptor: Erro 401/403. Token expirado ou inválido. Deslogando...'
        );

        auth.logout();

        return throwError(() => error);
      }

      return throwError(() => error);
    })
  );
};
