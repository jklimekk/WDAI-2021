import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  setPersistence(type: string) { return this.authService.changePersistence(type); }
}
