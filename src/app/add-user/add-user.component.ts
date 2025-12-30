import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  searchText: string = '';
  selectedUser: any[] = []; // array to store search results
  form: any = {
    name: '',
    email: '',
    phone: '',
    sharing: 1
  };

  constructor(private RequestService: RequestService) {}

  ngOnInit() {}

  // 🔎 Search user by phone/email
  searchUsers() {
    this.RequestService.searchUsers(this.searchText).subscribe({
      next: (res: any) => {
        this.selectedUser = res.data; // populate search results
      },
      error: (err) => console.log(err)
    });
  }

  // ✅ Select a user to autofill the form
  selectUser(user: any) {
    this.form.name = user.name;
    this.form.email = user.email;
    this.form.phone = user.mobile; // or 'user.phone' depending on your model
  }

  // ➕ Add user to hostel
  addUserToHostel() {
    if (!this.form.name || !this.form.email || !this.form.phone) {
      return alert('Select a user first');
    }

    const sharingMap: any = {
  1: "twoSharing",
  2: "threeSharing",
  3: "fourSharing",
  4: "fiveSharing",
  5: "sixSharing"
};

    const payload = {
      ownerId: localStorage.getItem('ownerId'),
      userId: this.selectedUser.find(u => u.mobile === this.form.phone)?._id,
      hostelId: localStorage.getItem('hostelId'), // set current hostel
      senderType: 'owner',
      sharingType: sharingMap[this.form.sharing]
    };

    this.RequestService.addUserToHostel(payload).subscribe({
      next: (res) => alert('User added successfully'),
      error: (err) => console.error('Error adding user:', err)
    });
  }

  back() {
    window.history.back();
  }
}
