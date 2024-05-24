import { Component, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [  
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MenuComponent

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav | any;

  

  toggleSidenav() {
    this.sidenav.toggle();
  }

  changeTheme(theme: string) {
    // Lógica para alterar o tema
    console.log('Changing theme to', theme);
  }
}
