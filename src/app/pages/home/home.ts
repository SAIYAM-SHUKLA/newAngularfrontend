import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

   products = signal<any[]>([]);
   

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // ---------------- FETCH PRODUCTS ----------------
  fetchProducts(): void {
    this.http
      .get<any[]>('https://ecommerceserverside1.onrender.com/api/products/')
      .subscribe({
        next: (res) => {
          this.products.set(res);
          console.log('Products fetched:', this.products);
        },
        error: (err) => {
          console.error('Failed to fetch products', err);
        },
      });
  }

  // ---------------- PLACE ORDER ----------------
  placeOrder(productId: string): void {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('authToken='));

    if (!cookie) {
      alert('Please login first');
      return;
    }

    const token = cookie.split('=')[1];

    const requestBody = {
      token: token,
      productId: productId,
      quantity: 1,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post(
        'https://ecommerceserverside1.onrender.com/api/orders/',
        requestBody,
        { headers }
      )
      .subscribe({
        next: (res: any) => {
          console.log('Order success:', res);
          alert('Order placed successfully!');
        },
        error: (err) => {
          console.error('Order failed:', err);
          alert('Order placement failed!');
        },
      });
  }
}
