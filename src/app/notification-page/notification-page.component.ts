import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {

  selectedRequest: any;
  message = '';

  constructor(private requestService: RequestService, private location: Location) {}

  ngOnInit() {
    this.selectedRequest = history.state.request;
    console.log('Request info ->', this.selectedRequest);
  }

  onAccept() {
    this.requestService.updateStatus(this.selectedRequest._id, 'accepted').subscribe({
      next: () => {
        this.message = '✅ Request accepted';
        this.selectedRequest.status = 'accepted';
      }
    });
  }

  onDecline() {
    this.requestService.updateStatus(this.selectedRequest._id, 'declined').subscribe({
      next: () => {
        this.message = '🚫 Request declined';
        this.selectedRequest.status = 'declined';
      }
    });
  }

      goBack() {
    this.location.back();
  }
}