import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string = '';
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
        
        // Nettoie l’URL sans recharger le composant
        const urlSansToken = this.router.url.split('?')[0];
        window.history.replaceState({}, '', urlSansToken); // Pas de reload
      }
    });
  }

  onSubmit() {
    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    console.log('Token envoyé :', this.token, 'Nouveau mot de passe :', password);

    this.authService.resetPassword(this.token, password).subscribe({
      next: () => {
        this.message = 'Mot de passe modifié avec succès.';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = 'Erreur lors de la réinitialisation.';
        this.message = '';
      },
    });
  }
}
