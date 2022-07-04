import { ValidatePassword } from './../../utils/password.validator';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  hide = true;
  hideConfirm = true;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: ValidatePassword.MatchPassword,
    });
  }


  get password() {
    return this.registrationForm.get('password')
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }

  get email() {
    return this.registrationForm.get('email');
  }


  registerUser() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value)
        .subscribe({
          next: (res) => {
            console.log("User Registered Successfully")
            this.registrationForm.reset();
            this.router.navigate(['login']);
          },
          error: () => {
            console.log("Error while registration");
          }
        });
    }
  }
}


