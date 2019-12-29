import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AgencyService } from './../../services/agency.service';
import { Router } from '@angular/router';

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
  itemToBeDeleted;

  constructor(
    public modalRef: BsModalRef,
    public firebaseAgencyService: AgencyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.firebaseAgencyService.getCollectionItem(this.collectionName, this.collectionId)
    .subscribe((data) => {
      console.log(data);
      this.itemToBeDeleted = data.name;
    });
  }

  private delete() {
    this.firebaseAgencyService.delete(this.collectionName, this.collectionId).then(res => {
      alert('Item deleted.');
      this.modalRef.hide();
      this.router.navigate(['/portfolio-view']);
    });

  }

  private cancel() {
    this.modalRef.hide();
  }

}
