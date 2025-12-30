import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private location: Location) {}

goBack() {
  this.location.back();
}

}
