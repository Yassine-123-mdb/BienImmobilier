import { Component } from '@angular/core';

@Component({
  selector: 'app-proprietaire-dash',
  templateUrl: './proprietaire-dash.component.html',
  styleUrls: ['./proprietaire-dash.component.css'],
})
export class ProprietaireDashComponent {
  isCollapsed = false; // Pour gérer le collapse de la sidebar
  isSidebarVisible = false; // Pour gérer la visibilité de la sidebar sur les écrans md et sm

  // Basculer la sidebar
  toggleSidebar(): void {
    if (window.innerWidth < 1200) {
      // Sur les écrans md et sm, basculer la visibilité de la sidebar
      this.isSidebarVisible = !this.isSidebarVisible;
    } else {
      // Sur les écrans xl, basculer le collapse de la sidebar
      this.isCollapsed = !this.isCollapsed;
    }
  }
}