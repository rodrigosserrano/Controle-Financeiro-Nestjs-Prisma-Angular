import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../../model/User";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserProfile} from "../../model/UserProfile";
import {TokenModel} from "../../model/TokenModel";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private urlApi    = 'http://localhost:3000'
  private tokenUser = localStorage.getItem('ac_t');
  userProfile =  new BehaviorSubject<UserProfile | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  authorize(data: UserLogin){
    return this.httpClient.post(`${this.urlApi}/login`, data)
  }

  //Fazer função de logout
  logout() {
    localStorage.clear();
    window.location.reload()
  }

  //Fazer funcao de register
  register(){}


  getLoginStatus = () => { return !!this.tokenUser };

  setTokenUser = (token: string) => { localStorage.setItem('ac_t', token) }

  getTokenUser(){
    if (this.tokenUser) {
      let isTokenExpired = this.jwtService.isTokenExpired(this.tokenUser)
      if(isTokenExpired) {
        return "";
      }
      let userInfo = this.jwtService.decodeToken(
        this.tokenUser
      ) as UserProfile;
      this.userProfile.next(userInfo);

      return this.tokenUser;
    }

    return "";
  };

  refreshToken(payload: TokenModel) {
    return this.httpClient.put<TokenModel>(`${environment.apiUrl}/refresh-token`, payload);
  }
}
