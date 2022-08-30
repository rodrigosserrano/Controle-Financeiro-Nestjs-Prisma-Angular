import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "./shared/services/authorization/authorization.service";
import {UserProfile} from "./shared/model/UserProfile";

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
