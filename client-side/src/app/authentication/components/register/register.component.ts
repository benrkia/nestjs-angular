import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/authentication.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailExists = false;

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
     if(password != confirmPassword) {
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         return null;
     }
 }

  constructor(private authenticationService: AuthenticationService,private formBuilder: FormBuilder, private router: Router, private modalService: NgbActiveModal) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      validator: RegisterComponent.MatchPassword
    });
  }

    get f() { return this.registerForm.controls; }

    onSubmit() {

        this.emailExists = false;

        if (this.registerForm.invalid) {
            return;
        }

        this.registerUser();
    }

    registerUser(){
      this.authenticationService.register(this.registerForm.value)
      .subscribe(
        res => {
          this.emailExists = false;
          localStorage.setItem('token', res.accessToken.accessToken);
          this.modalService.close();
          this.router.navigate(['/newest-tweets']);
        },
        err => {
          if(err.status === 500){
            this.emailExists = true;
          }
        }
      )
    }

}