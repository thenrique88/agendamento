import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  selectedYear: number = new Date().getFullYear();
  months: string[] = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  changeYear(value: number) {
    this.selectedYear += value;
  }

  selectMonth(month: number) {
    const selectedDate = {
      year: this.selectedYear,
      month: month
    };
    console.log('Mês e ano selecionado:', selectedDate);
    // Aqui você pode disparar um evento ou realizar qualquer ação com a data selecionada
  }
}
