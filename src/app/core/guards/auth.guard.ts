import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.group('AuthGuard canActivate');
    console.log('AuthGuard: canActivate chamado para rota:', state.url);

    return this.auth.currentToken$.pipe(
      take(1),
      map((token) => {
        if (token) {
          console.log(
            'AuthGuard: Token encontrado (via currentToken$). Acesso permitido.'
          );
          console.groupEnd();
          return true;
        } else {
          console.error(
            'AuthGuard: Token NÃO encontrado (via currentToken$). Redirecionando para /login.'
          );
          this.router.navigate(['/login']);
          console.groupEnd();
          return false;
        }
      })
    );
  }
}
