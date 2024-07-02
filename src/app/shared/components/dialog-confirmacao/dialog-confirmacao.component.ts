import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-dialog-confirmacao',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    MatDatepickerModule
  ],
  templateUrl: './dialog-confirmacao.component.html',
  styleUrl: './dialog-confirmacao.component.scss'
})
export class DialogConfirmacaoComponent {

  readonly dialogRef = inject(MatDialogRef<DialogConfirmacaoComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  textoConfirmacao = '';

  constructor(){
    this.textoConfirmacao = this.data;
  }


}
