import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../types/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().snapshotChanges()
          .pipe(map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))))
          .subscribe(users => {this.users = users;});
  }

  ban(user: User){
    this.userService.ban(user);
  }

  unban(user: User) {
    this.userService.unban(user);
  }
  
  makeManager(user: User) {
    this.userService.makeManager(user);
  }

  unmakeManager(user: User) {
    this.userService.unmakeManager(user);
  }

  makeAdmin(user: User) {
    this.userService.makeAdmin(user);
  }

  unmakeAdmin(user: User) {
    this.userService.unmakeAdmin(user);
  }

}
