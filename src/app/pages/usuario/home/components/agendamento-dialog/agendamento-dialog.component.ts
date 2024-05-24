import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { HorarioModel } from '../../../../../shared/models/horario.model';

@Component({
  selector: 'app-agendamento-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './agendamento-dialog.component.html',
  styleUrl: './agendamento-dialog.component.scss'
})
export class AgendamentoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AgendamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HorarioModel,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
