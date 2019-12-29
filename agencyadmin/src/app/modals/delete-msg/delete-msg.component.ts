import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AgencyService } from './../../services/agency.service';

@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.scss']
})
export class DeleteMsgComponent implements OnInit {

  modalMainMessage;
  modalSecondaryMessage;
  collectionId;
  collectionName;
  collectionObject;

  constructor(
    public modalRef: BsModalRef,
    public firebaseAgencyService: AgencyService,
  ) { }
j
  ngOnInit() {
    let collectionItem = this.firebaseAgencyService.getCollectionItem(this.collectionName, this.collectionId);
    this.modalMainMessage = collectionItem;

  }

}
