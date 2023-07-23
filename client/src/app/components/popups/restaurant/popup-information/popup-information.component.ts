import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-information',
  templateUrl: './popup-information.component.html',
  styleUrls: ['./popup-information.component.scss', '../../../../../styles.scss']
})
export class PopupInformationComponent {

  constructor(
    private modalService: NgbModal
  )
  {}

  closePopup(){
    this.modalService.dismissAll()
  }
}
