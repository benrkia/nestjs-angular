import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/authentication.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongInfo = false;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router:Router, private modalService: NgbActiveModal) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  });
  }

    get f() { return this.loginForm.controls; }

    onSubmit() {

      this.wrongInfo = false;

      if (this.loginForm.invalid) {
          return;
      }

      this.login();
    }

    login(){
      this.authenticationService.login(this.loginForm.value)
      .subscribe(
        res => {
          this.wrongInfo = false;
          localStorage.setItem('token', res.accessToken.accessToken);
          this.modalService.close();
          this.router.navigate(['/newest-tweets']);
        },
        err => {
          if(err.status === 401){
            this.wrongInfo = true;
          }
        }
      )
    }

}
