import { Component, Input } from '@angular/core';
import {UserService} from "../../../../services/api/user.service";
import { Router } from '@angular/router';
import {User} from "../../../../interfaces/user-interface";
import {AuthService} from "../../../../services/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup-delete-user',
  templateUrl: './popup-delete-user.component.html',
  styleUrls: ['./popup-delete-user.component.scss', '../../../../../styles.scss']
})
export class PopupDeleteUserComponent {
  @Input() currentUser!: User;

  successMessage: string | null;
  errorMessage: string | null;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  )
  {
    this.currentUser = {} as User;
    this.successMessage = null;
    this.errorMessage = null;
  }

  confirmToDelete() {
    this.userService.deleteUser(this.currentUser)
      .subscribe(() => {
          this.successMessage = 'Votre compte a bien été supprimé !';
          this.authService.setCurrentUser(null);
          this.modalService.dismissAll()
          this.router.navigate(['/api/v1']);
        },
        error => {
          this.errorMessage = 'Erreur lors de la suppression, veuillez réessayer ultérieurement.';
        })
  }

  redirectToDashboard(){
    this.modalService.dismissAll()
  }
}
