import {Injectable, NgModule} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {map, mergeMap, Observable, of, retry, switchMap, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "./core/services/authorization/authorization.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserProfile} from "./core/model/UserProfile";
import {Router} from "@angular/router";
import { TokenModel } from "./core/model/TokenModel";

@Injectable()
export class ValidateTokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthorizationService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('ac_t');
    let req = ValidateTokenInterceptor.addToken(request, token);
    return next.handle(req);
  }

  private static addToken(request: HttpRequest<any>, token: string | null) {
    const req = request;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return req.clone({ headers });
  }

    /*********************/

  //   let req = request;
  //
  //   if(this.token) {
  //     if (!this.isTokenExpired) {
  //       req = ValidateTokenInterceptor.addToken(request, this.token)
  //       return next.handle(req)
  //     }
  //   } else {
  //     this.isTokenExpired = false;
  //   }
  //
  //   return next.handle(req).pipe(
  //     catchError((error) => {
  //       if (error instanceof HttpErrorResponse) {
  //         if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized) {
  //           this.toastrService.error((<HttpErrorResponse>error).error.message, 'Erro', { closeButton: true });
  //         }
  //
  //         if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized) {
  //           if ((<HttpErrorResponse>error).error.message != 'invalid_token' && this.isTokenExpired) {
  //             this.authService.refreshToken().subscribe((r: any) => this.authService.setTokenUser(r.access_token))
  //           }
  //           else if ((<HttpErrorResponse>error).error.message == 'invalid_token'){
  //             this.authService.logout();
  //           }
  //         }
  //       }
  //       return of(error);
  //     })
  //   )
  // }
  //
  // private static addToken(request: HttpRequest<any>, token: string) {
  //   const req = request;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  //
  //   return req.clone({ headers });
  // }

}
