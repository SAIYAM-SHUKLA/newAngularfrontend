import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
    name = '';
  email = '';
  password = '';
  role = 'buyer';

  loading = signal(false);
  message = signal('');
  success = signal(false);

  constructor(private http: HttpClient) {}

  register() {
    this.loading.set(true);
    this.message.set('');

    this.http.post(
      'https://ecommerceserverside1.onrender.com/api/users/register',
      {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      }
    ).subscribe({
      next: () => {
        this.success.set(true);
        this.message.set('User registered successfully!');
        this.loading.set(false);
      },
      error: (err) => {
        this.success.set(false);
        this.message.set(err.error?.message || 'Registration failed');
        this.loading.set(false);
      }
    });
  }

}
