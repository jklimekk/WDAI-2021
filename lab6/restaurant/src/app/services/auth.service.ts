import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { map, Observable, switchMap } from 'rxjs';
import { User } from '../types/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  userData!: Observable<firebase.User | null>;
  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;

  signedIn = false;
  user: any;
  admin = false;
  manager = false;

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) {
    this.userData = fireAuth.authState;
    this.userData.subscribe((User)=>{if(User === null){
                                        this.user = null;
                                        this.signedIn = false;
                                      } else {
                                        this.user = User;
                                        this.signedIn = true;
                                        this.checkAdmin();
                                        this.chekManager();
                                      }
    });
  }
  
  ngOnInit(): void { }

  signin(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(result => { console.log('Zalogowano'); })
                                                                    .catch(err => { console.log('Error ', err.message); });
  }

  signout() {
    return this.fireAuth.signOut().then(res => { console.log('Wylogowano');
                                                  localStorage.clear();
                                                }).catch(err => {console.log('Error ', err.message);})
  }

  signup(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(result => {
        console.log('Zarejestrowano', result);
        this.userService.addUSer(result.user!.uid, result.user!.email!);
      }).catch(error => { console.log('Error ', error.message);});
  }

  changePersistence(type: string) {
    switch (type) {
      case "none":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);    
      case "local":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);    
      case "session":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);    
      default:
        break;
    }

    return null;
  }

  checkIfSignedIn(): boolean { return this.signedIn; }

  checkAdmin() {
    return this.userData.pipe(switchMap(user => this.userService.getUser(user?.uid)))
            .pipe(map(user=> user.admin)).subscribe(result => this.admin = result);
  }

  chekManager() {
    return this.userData.pipe(switchMap(user => this.userService.getUser(user?.uid)))
            .pipe(map(user=> user.manager)).subscribe(result => this.manager = result);
  }

}
