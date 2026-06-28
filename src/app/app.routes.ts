import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { BuscadorMedicos } from './components/buscador-medicos/buscador-medicos';
import { Agendamiento } from './components/agendamiento/agendamiento';
import { Contacto } from './components/contacto/contacto';
import { Nosotros } from './components/nosotros/nosotros';
import { Especialidades } from './components/especialidades/especialidades';
import { DetalleCardiologia } from './components/detalle-cardiologia/detalle-cardiologia';
import { PerfilMedico } from './components/perfil-medico/perfil-medico';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'nosotros', component: Nosotros },
    { path: 'medicos', component: BuscadorMedicos },
    { path: 'medicos/:id', component: PerfilMedico },
    { path: 'agendar', component: Agendamiento },
    { path: 'especialidades', component: Especialidades },
    { path: 'especialidades/:id', component: DetalleCardiologia},
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
];
