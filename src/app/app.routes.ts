import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BuscadorMedicos } from './components/buscador-medicos/buscador-medicos';
import { Agendamiento } from './components/agendamiento/agendamiento';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'medicos', component: BuscadorMedicos },
    { path: 'agendar', component: Agendamiento },
    { path: '**', redirectTo: '' }
];
