import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { ROLE } from '../utils/biz-constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObject$: BehaviorSubject<User | null>;

  userObject: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.userObject$ = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user-key') as string));
    this.userObject = this.userObject$.asObservable();
  }

  get user(): User {
    return this.userObject$.value as User;
  }

  login(username: string, password: string) {

    // ===== mock====
    const user = {
      username: username,
      address: 'address',
      token: 'token_string',
      roles: [ROLE.ADMIN]
    }
    localStorage.setItem('user-key', JSON.stringify(user));
    this.userObject$.next(user);
    this.router.navigate(['home'])

    // ======mock end====

    // you server
    // this.http.post<User>('/', {username, password})
    //   .subscribe((response) => {
    //     localStorage.setItem('user-key', JSON.stringify(response))
    // });
  }

  logout() {
    this.userObject$.next(null);
    localStorage.removeItem('user-key');
    this.router.navigate(['login'])

  }


}
