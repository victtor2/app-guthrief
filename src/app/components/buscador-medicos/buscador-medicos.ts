import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Medicos } from '../../services/medicos';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-buscador-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buscador-medicos.html',
  styleUrl: './buscador-medicos.scss',
})
export class BuscadorMedicos {
  private medicosService = inject(Medicos);
  private router = inject(Router);

  // Traemos los médicos en tiempo real desde Firestore
  medicosBD = toSignal(this.medicosService.obtenerMedicos(), { initialValue: [] });

  terminoBusqueda = signal('');

  // 1. Motor de búsqueda y filtrado general
  medicosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase();
    const prioridades: { [key: string]: number } = {
      'cardiolog': 1,
      'vascular': 2,
      'nefrol': 3
    };

    const listaMedicos = this.medicosBD() as any[];

    const medicosFiltradosBase = listaMedicos.filter((medico: any) => {
      const nombreMedico = (medico.nombre || '').toLowerCase();
      const textEspecialidad = (medico.especialidad || '').toLowerCase();
      return nombreMedico.includes(termino) || textEspecialidad.includes(termino);
    });

    return medicosFiltradosBase.sort((a: any, b: any) => {
      const espA = (a.especialidad || '').toLowerCase();
      const espB = (b.especialidad || '').toLowerCase();

      const claveA = Object.keys(prioridades).find(key => espA.includes(key));
      const claveB = Object.keys(prioridades).find(key => espB.includes(key));

      const pesoA = claveA ? prioridades[claveA] : 99;
      const pesoB = claveB ? prioridades[claveB] : 99;

      return pesoA - pesoB;
    });
  });

  // 2. SECCIÓN: Staff Principal (Doctoras)
  medicosPrincipales = computed(() => {
    return this.medicosFiltrados().filter((medico: any) => {
      const cat = (medico.categoria || '').toLowerCase();
      const nom = (medico.nombre || '').toLowerCase();
      // Si en la BD no tienen categoría, clasificamos por no ser el Dr. Harold
      return cat === 'principal' || (!cat && !nom.includes('harold'));
    });
  });

  // 3. SECCIÓN: Asociados Nacionales (Dr. Harold)
  medicosNacionales = computed(() => {
    return this.medicosFiltrados().filter((medico: any) => {
      const cat = (medico.categoria || '').toLowerCase();
      const nom = (medico.nombre || '').toLowerCase();
      return cat === 'nacional' || nom.includes('harold');
    });
  });

  // 4. SECCIÓN: Asociados Internacionales (Avatar provisional hasta confirmar)
  medicosInternacionales = computed(() => {
    const internacionalesBase = this.medicosFiltrados().filter((medico: any) => {
      const cat = (medico.categoria || '').toLowerCase();
      return cat === 'internacional';
    });

    // Si aún no hay médicos internacionales en la BD, mostramos un avatar provisional
    if (internacionalesBase.length === 0) {
      return [
        {
          id: 'provisional-1',
          nombre: 'Especialista Internacional',
          especialidad: 'Interconsulta & Cardiología Internacional',
          imagen: '', // Sin imagen para que use el avatar con iniciales "EI"
          esProvisional: true
        }
      ];
    }

    return internacionalesBase;
  });

  obtenerIniciales(nombreCompleto: string): string {
    if (!nombreCompleto) return 'IC';
    const nombreLimpio = nombreCompleto.replace('Dr. ', '').replace('Dra. ', '');
    const palabras = nombreLimpio.split(' ').filter(p => p.trim() !== '');

    if (palabras.length >= 2) {
      return (palabras[0].charAt(0) + palabras[1].charAt(0)).toUpperCase();
    }
    return palabras[0].charAt(0).toUpperCase();
  }

  obtenerSlug(nombreCompleto: string): string {
    if (!nombreCompleto) return 'dra_paulina';
    const nombreLimpio = nombreCompleto.toLowerCase();
    
    if (nombreLimpio.includes('verónica') || nombreLimpio.includes('veronica')) return 'dra_veronica';
    if (nombreLimpio.includes('karina')) return 'dra_karina';
    if (nombreLimpio.includes('fernanda')) return 'dra_fernanda';
    if (nombreLimpio.includes('paulina')) return 'dra_paulina';
    if (nombreLimpio.includes('harold')) return 'dr_harold';
    
    return 'dra_paulina';
  }

  irAAgendamiento() {
    this.router.navigate(['/agendar']);
  }
}