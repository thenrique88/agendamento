import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-planos',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
  ],
  templateUrl: './dialog-planos.component.html',
  styleUrl: './dialog-planos.component.scss'
})
export class DialogPlanosComponent {

}
