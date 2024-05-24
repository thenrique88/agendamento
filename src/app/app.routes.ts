import { Routes } from '@angular/router';
import { HomeComponent } from './pages/usuario/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AgendaComponent } from './pages/admin/agenda/agenda.component';
import { ConfigurarAgendaComponent } from './pages/admin/configurar-agenda/configurar-agenda.component';
import { AgendamentoComponent } from './pages/usuario/agendamento/agendamento.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent
},
{
    path: 'agendamento',
    component: AgendamentoComponent
},
{
    path: 'admin',
    component: AdminComponent,
    children: [
        {
            path: 'agenda',
            component: AgendaComponent
        },
        {
            path: 'configurar-agenda',
            component: ConfigurarAgendaComponent
        }
    ]
}
];
