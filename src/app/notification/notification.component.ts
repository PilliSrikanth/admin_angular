import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  requests: any[] = [];
  ownerId = '';

  constructor(
    private requestService: RequestService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.ownerId = localStorage.getItem('ownerId') || '';
    this.loadRequests();
  }

  loadRequests() {
    // Call the owner-specific endpoint
    this.requestService.getOwnerRequests(this.ownerId).subscribe((res: any) => {
      // Filter only requests sent to owner (ignore requests sent by owner)
      this.requests = res.data.filter((r: any) => r.senderType === 'user');
    });
  }

  openDetails(request: any) {
    this.router.navigate(['/notification-page'], { state: { request } });
  }

  goBack() {
    this.location.back();
  }

}
