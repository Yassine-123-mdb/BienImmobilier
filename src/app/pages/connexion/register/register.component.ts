import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  role: string = '';
  nom: string = '';
  prenom: string = '';
  region: string = '';
  adresse: string = '';
  telephone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  

  regions: string[] = ['Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Bizerte'];

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  verif() {
    if (!this.nom ||!this.prenom ||!this.role ||!this.region || !this.email ||!this.confirmPassword || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    
  }
  onRegister(){
    this.verif()
  }
}
