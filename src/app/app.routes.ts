import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BuscadorMedicos } from './components/buscador-medicos/buscador-medicos';
import { Agendamiento } from './components/agendamiento/agendamiento';
import { Contacto } from './components/contacto/contacto';
import { Nosotros } from './components/nosotros/nosotros';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'nosotros', component: Nosotros },
    { path: 'medicos', component: BuscadorMedicos },
    { path: 'agendar', component: Agendamiento },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
];
