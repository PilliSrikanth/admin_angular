import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostelService } from '../hostel.service';

@Component({
  selector: 'app-hostel-page',
  templateUrl: './hostel-page.component.html',
  styleUrls: ['./hostel-page.component.css']
})
export class HostelPageComponent implements OnInit {

  hostel: any;
  hostelId: string = '';
  reviews: any[] = [];
  
  appName = "AGStgtech";
  hostelImage = "assets/img/banner.jpg";

  constructor(
    private route: ActivatedRoute,
    private hostelService: HostelService,
    private router: Router
  ) {}

  ngOnInit() {
    const hostelId = this.route.snapshot.paramMap.get('id'); // get hostelId from URL
    if (hostelId) {
      this.hostelId = hostelId; // ✅ set hostelId here
      this.loadHostel(hostelId);
      this.loadReviews(); // ✅ call after hostelId is set
    } else {
      console.error('Hostel ID not found in route');
    }
  }

  loadHostel(hostelId: string) {
    this.hostelService.getHostelById(hostelId).subscribe({
      next: (h: any) => {
        const vacancyValues: number[] = Object.values(h.vacancy) as number[];
        const totalVacancyCount = vacancyValues.reduce((a, b) => a + b, 0);
        const totalFilled = h.hostelUsers?.length || 0;

        this.hostel = {
          ...h,
          totalFilled,
          totalVacancy: totalVacancyCount - totalFilled
        };
      },
      error: (err) => console.error(err)
    });
  }

  goToTransactions(hostelId: string){
    localStorage.setItem('hostelId', hostelId);
    this.router.navigate(['/transaction']);
  };

  goToHostelUsers(hostelId: string){
    localStorage.setItem('hostelId', hostelId);
    this.router.navigate(['/user']);
  };

  goToAddUser(hostelId: string) {
    localStorage.setItem('hostelId', hostelId);
    this.router.navigate(['/add-user']);
  }

  loadReviews() {
    if (!this.hostelId) return; // ✅ safety check

    this.hostelService.getReviewsByHostel(this.hostelId).subscribe(
      (res: any) => {
        this.reviews = res.data || [];
      },
      (err) => {
        console.error('Error fetching reviews:', err);
      }
    );
  }
}
