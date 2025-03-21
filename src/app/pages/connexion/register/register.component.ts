import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  region: string = '';
  adresse: string = '';
  telephone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  roles: string[] = []; // L'utilisateur choisira son rôle

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  regions: string[] = ['Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Bizerte'];

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {
    if (!this.nom || !this.prenom || !this.region || !this.email || !this.password || !this.confirmPassword || this.roles.length === 0) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    if(this.roles[0]=="PROPRIETAIRE"){
      this.router.navigate(['/proprietaire/abonnement']);

    }
    if(this.roles[0]=="VISITEUR"){
      this.router.navigate(['/accueil']);
    }


    const user = {
      nom: this.nom,
      prenom: this.prenom,
      region: this.region,
      adresse: this.adresse,
      telephone: this.telephone,
      email: this.email,
      motDePasse: this.password,
      roles: this.roles // ✅ Envoie bien un tableau des rôles
    };
    

   /*  this.authService.register(user).subscribe(
      (response) => {
        console.log('Inscription réussie', response);
        alert('Inscription réussie !');
        this.router.navigate(['/login']); // Redirection vers la page de connexion
      },
      (error) => {
        console.error('Erreur lors de l\'inscription', error);
        alert('Erreur lors de l\'inscription');
      }
    ); */
  }
}
