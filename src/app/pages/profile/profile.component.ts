import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../models/Utilisateur';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: Utilisateur | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
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
        this.user.image = reader.result as string; // 🔥 Mettre à jour l'image
      };
    }
  }
}
