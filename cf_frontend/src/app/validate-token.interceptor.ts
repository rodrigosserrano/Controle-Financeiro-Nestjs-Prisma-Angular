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
import {Observable, of, retry} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "./core/services/authorization/authorization.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class ValidateTokenInterceptor implements HttpInterceptor {

  token: string | any = this.authService.getTokenUser();
  isTokenExpired = this.jwtHelper.isTokenExpired(this.token);

  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthorizationService,
    private readonly jwtHelper: JwtHelperService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let req = request;

    if (!this.isTokenExpired) {
      req = ValidateTokenInterceptor.addToken(request, this.token)
      return next.handle(req)
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized) {
            this.toastrService.error((<HttpErrorResponse>error).error.message, 'Erro', { closeButton: true });
          }

          if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized) {
            if ((<HttpErrorResponse>error).error.message != 'invalid_token' && this.isTokenExpired) {
              this.authService.refreshToken().subscribe((r: any) => this.authService.setTokenUser(r.access_token))
            }
            // else if ((<HttpErrorResponse>error).error.message == 'invalid_token'){
            //   this.authService.logout();
            // }
          }
        }
        return of(error);
      })
    )
  }

  private static addToken(request: HttpRequest<any>, token: string) {
    const req = request;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return req.clone({ headers });
  }

}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidateTokenInterceptor,
      multi: true,
    },
  ],
})

export class Interceptor {}
