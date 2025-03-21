import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-proprietaire',
  templateUrl: './profile-proprietaire.component.html',
  styleUrl: './profile-proprietaire.component.css'
})
export class ProfileProprietaireComponent {
  user = {
    nom: "John Doe",
    region: "Tunis",
    adresse: "Avenue Habib Bourguiba",
    telephone: "+216 55 123 456",
    email: "johndoe@example.com",
    image: "assets/yassine.jpg"
  };

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.image = reader.result as string;
      };
    }
  }
}