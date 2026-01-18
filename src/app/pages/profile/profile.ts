import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  name = signal<string>('');
  email = '';
  role = '';
  orders = signal<any>([]);
  message = '';
  showProfile = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return value;
    }
    return null;
  }

  fetchProfile() {
    const token = this.getCookie('authToken');

    if (!token) {
      this.message = 'Please login to access your profile.';
      return;
    }

    this.http
      .get<any>(
        `https://ecommerceserverside1.onrender.com/api/users/profile?token=${token}`
      )
      .subscribe({
        next: (data) => {
          this.showProfile.set(true);
          this.name.set(data.name);
          this.email = data.email;
          this.role = data.role;

          this.fetchOrders(token);
          console.log("data of profile is fetched")
          console.log(this.name)
           },
        error: () => {
          this.message = 'Failed to load profile.';
        },
      });
  }

  fetchOrders(token: string) {
    this.http
      .get<any[]>(
        `https://ecommerceserverside1.onrender.com/api/orders/buyer?token=${token}`
      )
      .subscribe({
        next: (orders) => {
          this.orders.set(orders);
          
        },
        error: () => {
          this.message = 'Failed to load orders.';
        },
      });
  }

  goToAddProduct() {
    window.location.href = '/addproduct';
  }
}
