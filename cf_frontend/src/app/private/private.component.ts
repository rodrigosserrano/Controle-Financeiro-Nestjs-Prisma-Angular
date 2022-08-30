import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../shared/services/authorization/authorization.service";
import {UserProfile} from "../shared/model/UserProfile";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.sass']
})
export class PrivateComponent implements OnInit{
  constructor(private authService: AuthorizationService) {}

  userInfo: UserProfile | null;

  ngOnInit(){
    this.userInfo = this.authService.userProfile.getValue();
  }

  logOut() {
    this.authService.logOut();
  }
}
