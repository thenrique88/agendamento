import { AgendamentoModel } from "./agendamento.model";

export interface HorariosSemanaModel{
    semana?: string;
    dataProximaSemana?: string;
    dataSemanaAnterior?: string;
    segunda: DiaDaSemana;
    terca: DiaDaSemana;
    quarta: DiaDaSemana;
    quinta: DiaDaSemana;
    sexta: DiaDaSemana;
    sabado: DiaDaSemana;
    domingo: DiaDaSemana;
}

export interface DiaDaSemana{
    dia: string;
    agendamentos: AgendamentoModel[];
}