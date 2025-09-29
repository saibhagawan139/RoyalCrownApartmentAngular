import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../app.config';

interface VisitLog {
  flatNo: string;
  ownerUsername: string;
  visitorType: string;
  securityGuardUsername: string;
  visitTime: string; // ISO string
  otpCode: string;
}

@Component({
  selector: 'app-visit-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visit-log.component.html',
  styleUrls: ['./visit-log.component.scss']
})
export class VisitLogComponent implements OnInit {
  visits: VisitLog[] = [];
  error = '';
  loading = false;
  fromDate = '';
  toDate = '';
  selectedVisits: Set<string> = new Set();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const now = new Date();
    this.toDate = now.toISOString().slice(0, 10);
    const past = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    this.fromDate = past.toISOString().slice(0, 10);
    this.loadVisits();
  }

  loadVisits() {
    this.error = '';
    this.loading = true;
    const params = new URLSearchParams();
    params.append('fromDate', new Date(this.fromDate).toISOString());
    params.append('toDate', new Date(this.toDate).toISOString());

    this.http.get<VisitLog[]>(`${environment.apiUrl}/security/visits?${params.toString()}`).subscribe({
      next: data => {
        this.visits = data;
        this.selectedVisits.clear();
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.error || 'Failed to load visit logs';
        this.loading = false;
      }
    });
  }

  toggleVisitSelection(otpCode: string, checked: boolean) {
    if (checked) {
      this.selectedVisits.add(otpCode);
    } else {
      this.selectedVisits.delete(otpCode);
    }
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      this.visits.forEach(v => this.selectedVisits.add(v.otpCode));
    } else {
      this.selectedVisits.clear();
    }
  }
  deleteSelectedVisits() {
  if (!confirm('Are you sure you want to delete visits in this date range?')) {
    return;
  }

  const body = {
    fromDate: new Date(this.fromDate).toISOString(),
    toDate: new Date(this.toDate).toISOString()
  };

  this.http.request('delete', `${environment.apiUrl}/security/visits`, { body }).subscribe({
    next: () => this.loadVisits(),
    error: err => {
      this.error = err.error?.error || 'Failed to delete visits';
    }
  });
}
}
