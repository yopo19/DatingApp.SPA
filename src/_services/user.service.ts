import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app/_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp) { }
    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl + 'users')
                .map(response => <User[]>response.json())
                .catch(this.handleError);
    }

    getUser(id): Observable<User> {
        return this.authHttp
                   .get(this.baseUrl + 'users/' + id)
                   .map(response => <User>response.json())
                   .catch(this.handleError);
    }
    updateUser(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/' + id, user)
        .catch(this.handleError);
    }
    setMainPhoto(userId: number, id: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
        .catch(this.handleError);
    }

    deletePhoto(userId: number, id: number) {
        return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id)
        .catch(this.handleError);
    }
    // De momento -- Luego se cambiará
    /*
    private jwt() {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = new Headers({'Authorization': 'Bearer ' + token});
            headers.append('Content-type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }*/

    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }       
        const serverError = error.json();
        let modelStateError = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateError += serverError[key] + '\n';
                }
            }

        }
        return Observable.throw(
            modelStateError || 'Error del servidor.'
        );

    }
}
