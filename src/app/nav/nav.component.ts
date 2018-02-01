import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor( public authService: AuthService,
               private alertify: AlertifyService,
               private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl
    .subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Inicio de sesión correcta.');
    }, error => {
      this.alertify.error('No se pudo autenticar.');
    }, () => {
      // Después de que se completó todo correctamente
      this.router.navigate(['/members']);
    });
  }
  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('Sesión cerrada.');
    this.router.navigate(['/home']);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

}
