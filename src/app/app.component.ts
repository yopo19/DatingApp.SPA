import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwHelper.decodeToken(token);
    }
  }
}
