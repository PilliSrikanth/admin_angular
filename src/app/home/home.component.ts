import { Component, OnInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hostels: any[] = [];           // all hostels
  filteredHostels: any[] = [];   // filtered hostels
  categories = ['Mens', "Women's", 'Room']; // categories
  activeCategory = 'Mens';       // default active category
  ownerId: any;

  constructor(private hostelService: HostelService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.ownerId = localStorage.getItem('ownerId');
    this.loadHostels();
  }

  loadHostels() {
    this.hostelService.getHostelsByOwner(this.ownerId).subscribe({
      next: async (res: any) => {
        // calculate total vacancy and ratings for each hostel
        const hostelsWithRating = await Promise.all(
          res.map(async (h: any) => {
            const totalVacancyCount = Object.values(h.vacancy || {}).reduce(
              (sum: number, val: any) => sum + Number(val), 0
            );
            const totalFilled = h.hostelUsers?.length || 0;

            // fetch hostel reviews
            const reviewsRes: any = await this.hostelService.getReviewsByHostel(h._id).toPromise();
            const reviews = reviewsRes?.data || [];

            const avgRating = reviews.length
              ? (reviews.reduce((sum: number, r: any) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
              : 0;

            return { ...h, totalFilled, totalVacancy: totalVacancyCount - totalFilled, avgRating, reviews };
          })
        );

        this.hostels = hostelsWithRating;
        this.filterByCategory(this.activeCategory);
      },
      error: (err) => console.log('error:', err)
    });
  }

  filterByCategory(category: string) {
    this.activeCategory = category;

    const mapCategory: { [key: string]: string } = {
      "Mens": "boys",
      "Women's": "girls",
      "Room": "room"
    };

    const dbType = mapCategory[category];

    if (dbType) {
      this.filteredHostels = this.hostels.filter(h => h.type?.toLowerCase() === dbType);
    } else {
      this.filteredHostels = [...this.hostels];
    }
  }

  openHostel(hostelId: string) {
    this.router.navigate(['/hostel-page', hostelId]);
  }

  createHostel() {
    this.router.navigate(['/create-hostel']);
  }

}
