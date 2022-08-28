import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "./core/services/authorization/authorization.service";
import {UserProfile} from "./core/model/UserProfile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthorizationService) {}
  title = 'Finance.io';
  userProfile?: UserProfile | null

  ngOnInit() {
    this.authService.userProfile.subscribe((data) => {
      this.userProfile = data;
    });
  }
}
