import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    this.authService.login({ email: this.email, motDePasse: this.password }).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
        localStorage.setItem('token', response.token); // Stocker le JWT
        alert('Connexion réussie !');
        this.router.navigate(['/dashboard']); // Rediriger après connexion
      },
      (error) => {
        console.error('Erreur de connexion', error);
        alert('Erreur de connexion');
      }
    );
  }
}
