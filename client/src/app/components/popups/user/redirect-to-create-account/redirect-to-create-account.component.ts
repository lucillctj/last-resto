import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-redirect-to-create-account',
  templateUrl: './redirect-to-create-account.component.html',
  styleUrls: ['./redirect-to-create-account.component.scss']
})
export class RedirectToCreateAccountComponent {

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {}

  redirectToHomePage(){
    this.modalService.dismissAll()
    this.router.navigate(['/api/v1']);
  }

  closePopup(){
    this.modalService.dismissAll()
  }
}
