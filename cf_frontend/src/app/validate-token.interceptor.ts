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

  token: string | any = this.authService.getTokenUser();
  isTokenExpired = this.jwtHelper.isTokenExpired(this.token);

  constructor(
    private readonly toastrService: ToastrService,
    private readonly authService: AuthorizationService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.indexOf('login') > -1){
      return next.handle(request);
    }

    const localStorageToken = localStorage.getItem('ac_t');
    let token: TokenModel;

    if(localStorageToken) {
      token = { access_token: localStorageToken } as TokenModel;
      let isTokenExpired = this.jwtHelper.isTokenExpired(token?.access_token);

      if(!isTokenExpired) {
        return next.handle(request);
      } else {
        //PENSAR EM COMO FAZER O REFRESH TOKEN
        //SWITCHMAP NAO ESTA DANDO CERTO OU O RETOTRNO DO BACKEND NAO TA ROLANDO
        //OU TALVEZ ESSA FUNC PRECISE SER ASYNC
        this.authService.refreshToken(token)
          .pipe(
            switchMap((newToken: TokenModel) => {
              localStorage.setItem('ac_t', newToken.access_token);

              let userInfo = this.jwtHelper.decodeToken(
                newToken.access_token
              ) as UserProfile;
              this.authService.userProfile.next(userInfo);

              let transformedReq = ValidateTokenInterceptor.addToken(request, newToken.access_token);

              return next.handle(transformedReq);
            }),
          )
        // this.authService.refreshToken(token)
        //   .pipe(
        //     switchMap((newToken: TokenModel) => {
        //       localStorage.setItem('ac_t', newToken.access_token);
        //       let userInfo = this.jwtHelper.decodeToken(
        //         newToken.access_token
        //       ) as UserProfile;
        //       this.authService.userProfile.next(userInfo);
        //       // let req = ValidateTokenInterceptor.addToken(request, newToken.access_token);
        //       // return next.handle(req);
        //       const transformedReq = request.clone({
        //         headers: request.headers.set(
        //           'Authorization',
        //           `Bearer ${newToken.access_token}`
        //         ),
        //       });
        //       return next.handle(transformedReq);
        //     }),
        //     catchError(err => {
        //       if (err instanceof HttpErrorResponse) {
        //         this.toastrService.error((<HttpErrorResponse>err).message);
        //       }
        //       this.authService.logout()
        //       return of(err);
        //     })
        // );
      }
    }
    this.router.navigate(['/']).then();
    return throwError(() => 'Chamada inválida');
  }

  private static addToken(request: HttpRequest<any>, token: string) {
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
