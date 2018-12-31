import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from 'src/app/authentication/components/register/register.component';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';
import { AuthenticationService } from 'src/app/authentication/shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authenticationService.loggedIn();
  }

  openRegister() {
    if(!this.authenticationService.loggedIn()){
      const modalRef = this.modalService.open(RegisterComponent, {size: 'sm'});
    }
  }

  openLogin() {
    if(!this.authenticationService.loggedIn()){
      const modalRef = this.modalService.open(LoginComponent, {size: 'sm'});
    }
  }

  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/newest-tweets'])
  }

}
