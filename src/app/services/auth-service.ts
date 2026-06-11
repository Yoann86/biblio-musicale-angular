import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environements/environement';

interface LoginResponse { accessToken: string; user: { id: number; email: string; name: string }; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  readonly isLoggedIn = computed(() => this.tokenSignal() !== null);

  get token() { return this.tokenSignal(); }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(tap((res) => {
        localStorage.setItem('token', res.accessToken);
        this.tokenSignal.set(res.accessToken);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
  }
}