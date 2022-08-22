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
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "./core/services/authorization/authorization.service";

@Injectable()
export class ValidateTokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthorizationService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getTokenUser();
    let req = request;
    if (token) { req = ValidateTokenInterceptor.addToken(request, token) }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized) {
            this.toastrService.error((<HttpErrorResponse>error).error.message, 'Erro', { closeButton: true });
          }

          //Interceptor para refresh token, ajustar
          if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized
          && (<HttpErrorResponse>error).error.message == 'invalid_tokenAJUSTAR') {
            this.authService.refreshToken();
          }
        }
        return of(error);
      })
    );
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
