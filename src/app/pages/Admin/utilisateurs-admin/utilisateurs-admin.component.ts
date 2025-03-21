import { Component, OnInit } from '@angular/core';

interface Utilisateur {
  id: number;
  image: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
}

@Component({
  selector: 'app-utilisateurs-admin',
  templateUrl: './utilisateurs-admin.component.html',
  styleUrls: ['./utilisateurs-admin.component.css'],
})
export class UtilisateursAdminComponent implements OnInit {
  // Données simulées des utilisateurs
  utilisateurs: Utilisateur[] = [
    {
      id: 1,
      image: 'assets/yassine.jpg',
      nom: 'Meddeb',
      prenom: 'yassine',
      email: 'ahmed@example.com',
      role: 'admin',
      actif: true,
    },
    {
      id: 2,
      image: 'assets/yassine.jpg',
      nom: 'Bouazizi',
      prenom: 'Fatma',
      email: 'fatma@example.com',
      role: 'proprietaire',
      actif: true,
    },
    {
      id: 3,
      image: 'assets/yassine.jpg',
      nom: 'Trabelsi',
      prenom: 'Mohamed',
      email: 'mohamed@example.com',
      role: 'client',
      actif: false,
    },
  ];

  // Filtres
  searchQuery: string = '';
  selectedRole: string = '';
  utilisateursFiltres: Utilisateur[] = [];

  ngOnInit(): void {
    this.filtrerUtilisateurs();
  }

  // Filtrer les utilisateurs
  filtrerUtilisateurs(): void {
    this.utilisateursFiltres = this.utilisateurs.filter((user) => {
      const matchesSearch =
        user.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.selectedRole ? user.role === this.selectedRole : true;
      return matchesSearch && matchesRole;
    });
  }

  // Supprimer un utilisateur
  supprimerUtilisateur(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmation) {
      this.utilisateurs = this.utilisateurs.filter((user) => user.id !== id);
      this.filtrerUtilisateurs();
      alert('Utilisateur supprimé avec succès !');
    }
  }

  // Activer/Désactiver un utilisateur
  toggleActivation(id: number): void {
    const user = this.utilisateurs.find((u) => u.id === id);
    if (user) {
      user.actif = !user.actif;
      alert(`Utilisateur ${user.actif ? 'activé' : 'désactivé'} avec succès !`);
    }
  }

  // Voir les réservations d'un client
  voirReservations(id: number): void {
    alert(`Afficher les réservations de l'utilisateur ${id}`);
  }

  // Voir les annonces d'un propriétaire
  voirAnnonces(id: number): void {
    alert(`Afficher les annonces de l'utilisateur ${id}`);
  }
}