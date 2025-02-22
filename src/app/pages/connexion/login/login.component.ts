import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = true; // Basculer entre Connexion & Inscription

  email: string = '';
  password: string = '';
  showPassword: boolean = false;


  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onLogin() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    console.log('Connexion avec :', this.email, this.password);
  }
}