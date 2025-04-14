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

        // Stocker le JWT dans un cookie HTTP-only sécurisé
        this.setSecureCookie('token', response.token);
        
        console.log(response);
        alert('Connexion réussie !');

        // Vérifier le rôle de l'utilisateur et rediriger en conséquence
        this.redirectBasedOnRole(response.roles);
      },
      (error) => {
        console.error('Erreur de connexion', error);
        alert('Erreur de connexion');
      }
    );
  }

  // Fonction pour définir un cookie HTTP-only sécurisé
  setSecureCookie(name: string, value: string) {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 60); // Le cookie expire dans 60 minutes

    // Création du cookie avec les attributs Secure, HttpOnly et SameSite
    document.cookie = `${name}=${value}; Secure; SameSite=Strict; expires=${expirationDate.toUTCString()}; path=/`;
  }

  // Rediriger l'utilisateur en fonction de son rôle
  redirectBasedOnRole(roles: any[]) {
    const roleTypes = roles.map(role => role.roleType); // ['PROPRIETAIRE', 'VISITEUR']
  
    if (roleTypes.includes('PROPRIETAIRE')) {
      console.log('ok');
      this.router.navigate(['/proprietaire']);
    } else if (roleTypes.includes('VISITEUR')) {
      this.router.navigate(['/home']);
    } else {
      alert('Rôle non autorisé');
    }
  }
}
