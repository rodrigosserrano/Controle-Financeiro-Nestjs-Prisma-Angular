import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../../model/User";
import {Router} from "@angular/router";
import {catchError, retry} from "rxjs";
import {environment} from "../../../../environments/environment";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private urlApi    = 'http://localhost:3000'
  private tokenUser = sessionStorage.getItem('ac_t');

  constructor(
    private httpClient: HttpClient,
  ) { }

  authorize(data: UserLogin){
    return this.httpClient.post(`${this.urlApi}/login`, data)
  }

  //Fazer função de logout
  logout() {
    sessionStorage.clear();
  }

  //Fazer funcao de register
  register(){}


  getLoginStatus = () => { return !!this.tokenUser };

  setTokenUser = (token: string) => { sessionStorage.setItem('ac_t', token) }

  getTokenUser = () => { return this.tokenUser };

  refreshToken() {
    //pensar em uma lógica para não cair em looping ao dar um refresh token
    this.httpClient.put(`${environment.apiUrl}/refresh-token`, { Token: this.tokenUser })
  }
}
