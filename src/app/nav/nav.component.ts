import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor( private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('loged ok');
    }, error => {
      this.alertify.error(error);
    });
  }
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('Sesión cerrada.');
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

}
