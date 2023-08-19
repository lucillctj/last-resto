import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-redirect-to-create-account',
  templateUrl: './redirect-to-create-account-or-login.component.html',
  styleUrls: ['./redirect-to-create-account-or-login.component.scss']
})
export class RedirectToCreateAccountOrLoginComponent {

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {}

  redirectToHomePage(){
    this.modalService.dismissAll()
    this.router.navigate(['/']);
  }

  redirectToLoginPage(){
    this.modalService.dismissAll()
    this.router.navigate(['/users/login']);
  }

  closePopup(){
    this.modalService.dismissAll()
  }
}
