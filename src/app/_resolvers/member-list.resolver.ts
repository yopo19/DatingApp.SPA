import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    /**
     *
     */
    constructor ( private userService: UserService,
        private router: Router,
        private alertify: AlertifyService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers()
        .catch(error => {
            this.alertify.error('Error de navegación.');
            this.router.navigate(['/members']);
            return Observable.of(null);
        });
    }

}