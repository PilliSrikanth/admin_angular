import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  baseUrl = 'http://localhost:3200/api';

  constructor(private http: HttpClient) { }

  getHostelsByOwner(ownerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/hostels/owner/${ownerId}`);
  }

    createHostel(hostelData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/hostels/add`, hostelData);
  }

  getHostelById(hostelId: string) {
    return this.http.get(`${this.baseUrl}/hostels/${hostelId}`);
  }
    getReviewsByHostel(hostelId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reviews/hostel/${hostelId}`);
  }
}
