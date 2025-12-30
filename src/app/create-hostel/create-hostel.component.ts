import { Component } from '@angular/core';
import { HostelService } from '../hostel.service';

@Component({
  selector: 'app-create-hostel',
  templateUrl: './create-hostel.component.html',
  styleUrls: ['./create-hostel.component.css']
})
export class CreateHostelComponent {

  hostel: any = {
    name: '',
    area: '',
    address: '',
    type: '',
    roomSharing: {},
    vacancy: {},
    location: {
      type: 'Point',
      coordinates: [0, 0]
    }
  };

  sharing: number[] = [2, 3, 4, 5, 6];
  selectedShare: number | null = null;

  sharePrice = 0;
  shareVacancy = 0;   

  // MEDIA STORAGE
  sharingImages: Record<number, File[]> = {};
  sharingVideos: Record<number, File[]> = {};

  // PREVIEWS
  sharingImagePreviews: string[] = [];
  sharingVideoPreviews: string[] = [];

  constructor(private hostelService: HostelService) {}

  // -------------------------
  // SELECT SHARING
  // -------------------------
  selectSharing(share: number) {
    this.selectedShare = share;
    this.sharePrice = this.hostel.roomSharing[share];
    this.shareVacancy = this.hostel.vacancy[share];
    this.loadPreviews();
  }

  setSharePrice() {
    if (this.selectedShare === null) return;
    this.hostel.roomSharing[this.selectedShare] = this.sharePrice;
  }

  setShareVacancy() {
    if (this.selectedShare === null) return;
    this.hostel.vacancy[this.selectedShare] = this.shareVacancy;
  }

  // -------------------------
  // ADD SHARING IMAGES (APPEND)
  // -------------------------
  selectSharingImages(event: any) {
    if (this.selectedShare === null) return;
    const share = this.selectedShare;

    const files = Array.from(event.target.files) as File[];
    if (!this.sharingImages[share]) this.sharingImages[share] = [];

    files.forEach(file => {
      this.sharingImages[share].push(file);
      const reader = new FileReader();
      reader.onload = () => this.sharingImagePreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  }

  // -------------------------
  // ADD SHARING VIDEOS (APPEND)
  // -------------------------
  selectSharingVideos(event: any) {
    if (this.selectedShare === null) return;
    const share = this.selectedShare;

    const files = Array.from(event.target.files) as File[];
    if (!this.sharingVideos[share]) this.sharingVideos[share] = [];

    files.forEach(file => {
      this.sharingVideos[share].push(file);
      this.sharingVideoPreviews.push(URL.createObjectURL(file));
    });

    event.target.value = '';
  }

  // -------------------------
  // REMOVE IMAGE / VIDEO
  // -------------------------
  removeSharingImage(index: number) {
    if (this.selectedShare === null) return;
    const share = this.selectedShare;
    this.sharingImages[share]?.splice(index, 1);
    this.sharingImagePreviews.splice(index, 1);
  }

  removeSharingVideo(index: number) {
    if (this.selectedShare === null) return;
    const share = this.selectedShare;
    this.sharingVideos[share]?.splice(index, 1);
    this.sharingVideoPreviews.splice(index, 1);
  }

  // -------------------------
  // LOAD PREVIEWS ON SWITCH
  // -------------------------
  loadPreviews() {
    this.sharingImagePreviews = [];
    this.sharingVideoPreviews = [];
    if (this.selectedShare === null) return;

    const share = this.selectedShare;

    this.sharingImages[share]?.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.sharingImagePreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });

    this.sharingVideos[share]?.forEach(file => {
      this.sharingVideoPreviews.push(URL.createObjectURL(file));
    });
  }

  // -------------------------
  // LOCATION
  // -------------------------
  getLiveLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.hostel.location.coordinates = [
        pos.coords.longitude,
        pos.coords.latitude
      ];
    });
  }

  // -------------------------
  // CREATE HOSTEL
  // -------------------------
  createHostel() {
  const formData = new FormData();

  // ✅ ADD OWNER ID
  const ownerId = localStorage.getItem('ownerId');
  if (!ownerId) {
    alert('Owner not logged in');
    return;
  }

  this.hostel.ownerId = ownerId;

  formData.append('hostel', JSON.stringify(this.hostel));

  Object.keys(this.sharingImages).forEach(key => {
    const share = Number(key);
    this.sharingImages[share].forEach(file => {
      formData.append(`sharing_${share}_images`, file);
    });
  });

  Object.keys(this.sharingVideos).forEach(key => {
    const share = Number(key);
    this.sharingVideos[share].forEach(file => {
      formData.append(`sharing_${share}_videos`, file);
    });
  });

  this.hostelService.createHostel(formData).subscribe({
    next: () => alert('Hostel created successfully'),
    error: err => console.error(err)
  });
}

}
