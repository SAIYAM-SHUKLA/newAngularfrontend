import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

   email = '';
  password = '';
  message = '';
  messageColor = '';

  constructor(private http: HttpClient) {}

  login() {
    const body = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('https://ecommerceserverside1.onrender.com/api/users/login', body)
      .subscribe({
        next: (result) => {
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);

          document.cookie = `authToken=${result.token}; path=/; expires=${nextWeek.toUTCString()}; Secure`;

          this.message = 'Login Successful!';
          this.messageColor = 'green';
        },
        error: (err) => {
          this.message = err?.error?.message || 'Invalid credentials';
          this.messageColor = 'red';
        },
      });
  }
}
