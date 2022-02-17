import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]],
                                password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.signup(this.form.get('email')?.value, this.form.get('password')?.value)
                    .then(() => this.router.navigate(['']))
                    .catch((e) => console.log(e.message));
  }

}
