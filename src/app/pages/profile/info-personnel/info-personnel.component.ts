import { Component } from '@angular/core';

@Component({
  selector: 'app-info-personnel',
  templateUrl: './info-personnel.component.html',
  styleUrls: ['./info-personnel.component.css']
})
export class InfoPersonnelComponent {
  user = {
    nom: "John Doe",
    region: "Tunis",
    adresse: "Avenue Habib Bourguiba",
    telephone: "+216 55 123 456",
    email: "johndoe@example.com"
  };
}