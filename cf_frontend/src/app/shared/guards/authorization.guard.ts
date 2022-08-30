import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {lastValueFrom, map, Observable, switchMap} from 'rxjs';
import {AuthorizationService} from "../services/authorization/authorization.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenModel} from "../model/TokenModel";
import {UserProfile} from "../model/UserProfile";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  public jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private readonly authService: AuthorizationService,
    private readonly router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = { access_token: localStorage.getItem('ac_t') } as TokenModel;

    this.authService.getAccessToken();
    let userProfile = this.authService.userProfile.getValue();

    if ((userProfile?.sub ?? 0) > 0) { // se eu tenho usuário
      // if (route.data['requiredAuth'] == false) { //minha rota não precisa de auth
      //
      //   this.router.navigate(['/']).then(); // navega
      //   return false;
      // }

      return true; // permite navegar em rota que precisa de auth
    } else { // Se nao tenho usuario
      if (route.data['requiredAuth'] == true) { // se minha rota precisa de auth, tento dar refreshToken
        if (!token) { // se nao tenho token, ja tiro o usuario da navegacao
          this.router.navigate(['/']).then();
          return false;
        }

        const isTokenExpired = this.jwtService.isTokenExpired(token.access_token);

        if (!isTokenExpired) { return true; } //se o token nao expirou, continua

        const isRefreshSuccess = this.refreshingToken(token);

        // se o token passado foi inválido ou nao pode atualizar, logout no usuário e tiro da navegação
        if (!isRefreshSuccess) { this.router.navigate(['/']).then(); }

        return isRefreshSuccess;
      }

      return true;
    }
  }

  private async refreshingToken(token: TokenModel) {
    let isRefreshSuccess: boolean;

    try {
      const response = await lastValueFrom(this.authService.refreshToken(token));
      const newToken = (<TokenModel>response).access_token;
      localStorage.setItem('ac_t', newToken);

      let userInfo = this.jwtService.decodeToken(
        newToken
      ) as UserProfile;

      this.authService.userProfile.next(userInfo);

      isRefreshSuccess = true;
    } catch (ex) {
      this.authService.logOut();
      isRefreshSuccess = false;
    }

    return isRefreshSuccess;
  }
}
