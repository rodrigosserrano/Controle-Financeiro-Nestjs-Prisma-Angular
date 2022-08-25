import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../core/services/authorization/authorization.service";
import {UserProfile} from "../core/model/UserProfile";

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
}
