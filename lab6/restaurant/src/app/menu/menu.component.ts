import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  authService: AuthService;

  constructor( private router: Router, authService: AuthService) { 
    this.authService = authService;
  }

  ngOnInit(): void { }

  signout() {
    this.authService.signout().then(() => this.router.navigate([''])).catch((e) => console.log(e.message));
  }
}
