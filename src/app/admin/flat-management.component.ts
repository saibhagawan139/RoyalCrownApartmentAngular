import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../app.config';

interface Flat {
  flatNo: string;
  president: boolean;
}

@Component({
  selector: 'app-flat-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flat-management.component.html',
  styleUrls: ['./flat-management.component.scss']
})
export class FlatManagementComponent implements OnInit {
  flats: Flat[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.error = '';
    this.loading = true;
    this.http.get<Flat[]>(`${environment.apiUrl}/admin/flat`).subscribe({
      next: data => {
        this.flats = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.error || 'Failed to load flats';
        this.loading = false;
      }
    });
  }

  togglePresident(flat: Flat) {
    const updated = { ...flat, president: !flat.president };
    this.http.put(`${environment.apiUrl}/admin/flat/${flat.flatNo}`, updated).subscribe({
      next: () => this.loadFlats(),
      error: err => alert(err.error?.error || 'Update failed')
    });
  }
}
