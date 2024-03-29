import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async login() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese un nombre de usuario y contraseña.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.authService.login(this.username, this.password).subscribe(async (loginSuccessful) => {
      if (loginSuccessful) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/qr-scanner']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario o contraseña incorrectos',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}