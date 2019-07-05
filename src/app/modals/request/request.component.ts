import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.styl']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd = 'yes';

  constructor(public dialogService: DialogService, private userService: UserService, private requestService: RequestsService) {
    super(dialogService);
  }

accept() {
  if (this.shouldAdd === 'yes') {
    this.scope.requestService.setRequestStatus(this.currentRequest, 'accepted')
      .then((data) => {
        console.log(data);

        this.userService
          .addFriend(this.scope.user.id, this.currentRequest.sender)
          .then(() => {
            alert('Solicitud aceptada');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (this.shouldAdd === 'no') {
    this.scope.requestService.setRequestStatus(this.currentRequest, 'rejected')
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (this.shouldAdd === 'later') {
    this.scope.requestService.setRequestStatus(this.currentRequest, 'decide_later')
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


}
