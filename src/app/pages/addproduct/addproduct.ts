import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-addproduct',
  imports: [FormsModule, RouterModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.scss',
})
export class Addproduct {

   name = '';
  description = '';
  price = 0;
  stock = 0;
  category = '';

  message = signal('');

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return document.cookie
      .split('; ')
      .find(c => c.startsWith('authToken='))
      ?.split('=')[1] || null;
  }

  addProduct() {
    const token = this.getToken();

    if (!token) {
      this.message.set('Please login first');
      return;
    }

    this.http.post(
      'https://ecommerceserverside1.onrender.com/api/products/',
      {
        token,
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
    ).subscribe({
      next: () => {
        this.message.set('Product added successfully!');
      },
      error: (err) => {
        this.message.set(err.error?.message || 'Failed to add product');
      }
    });
  }

}
