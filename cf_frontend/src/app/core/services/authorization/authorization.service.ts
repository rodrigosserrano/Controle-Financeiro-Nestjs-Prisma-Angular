import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {UserLogin} from "../../model/User";
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserProfile} from "../../model/UserProfile";
import {TokenModel} from "../../model/TokenModel";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userProfile =  new BehaviorSubject<UserProfile | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  authorize(payload: UserLogin){
    return this.httpClient.post(`${environment.apiUrl}/login`, payload)
      .pipe(
        map((data) => {
          let token = data as TokenModel;

          localStorage.setItem('ac_t', token.access_token);

          let userInfo = this.jwtService.decodeToken(
            token.access_token
          ) as UserProfile;

          this.userProfile.next(userInfo);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      )
  }

  //Fazer função de logout
  logout() {
    localStorage.clear();
    window.location.reload()
  }

  //Fazer funcao de register
  register(){}

  getAccessToken(){
    let localStorageToken = localStorage.getItem('ac_t');
    if (localStorageToken) {
      let token = { access_token: localStorageToken } as TokenModel;
      let isTokenExpired = this.jwtService.isTokenExpired(token.access_token);

      if(isTokenExpired){
        this.userProfile.next(null);
        return "";
      }
      let userInfo = this.jwtService.decodeToken(
        token.access_token
      ) as UserProfile;
      this.userProfile.next(userInfo);

      return token.access_token
    }
    return "";
  };

  refreshToken(payload: TokenModel) {
    // let response: any[] = [];
    return this.httpClient.put<TokenModel>(`${environment.apiUrl}/refresh-token`, payload)
      // .pipe(
      //   map((newToken: TokenModel) => {
      //     let token = newToken as TokenModel;
      //
      //     localStorage.setItem('ac_t', token.access_token);
      //
      //     let userInfo = this.jwtService.decodeToken(
      //       token.access_token
      //     ) as UserProfile;
      //
      //     this.userProfile.next(userInfo);
      //
      //     return token.access_token;
      //   }),
      //   catchError((error) => {
      //     if ((<HttpErrorResponse>error).status === HttpStatusCode.Unauthorized &&
      //       (<HttpErrorResponse>error).error.message == 'invalid_token'){
      //       return "";
      //     }
      //     return of("");
      //   })
      // )
      // .subscribe((newToken) => {
      //   response.push({access_token: newToken})
      // });
      //
      // return response;
  }
}
