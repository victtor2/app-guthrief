import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop'; // <-- Para transformar Firebase a Signals
import { Medicos } from '../../services/medicos';

@Component({
  selector: 'app-buscador-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule], //Importamos FormsModule para el input de búsqueda
  templateUrl: './buscador-medicos.html',
  styleUrl: './buscador-medicos.scss',
})

export class BuscadorMedicos {
  // Inyectamos el servicio que acabamos de crear
  private medicosService = inject(Medicos);
  
  // toSignal se encarga de escuchar a Firebase y manejar el estado automáticamente
  medicosBD = toSignal(this.medicosService.obtenerMedicos(), { initialValue: [] });

  terminoBusqueda = signal('');

  // Nuestro computed ahora está blindado contra datos vacíos o erróneos
  medicosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase();
    
    return this.medicosBD().filter(medico => {
      // Usamos el operador '?.' y '||' para que si el campo no existe, use un texto vacío y no rompa la app
      const nombreMedico = (medico.nombre || '').toLowerCase();
      const especialidadMedico = (medico.especialidad || '').toLowerCase();
      
      return nombreMedico.includes(termino) || especialidadMedico.includes(termino);
    });
  });

 obtenerIniciales(nombreCompleto: string): string {
    if (!nombreCompleto) return '';
    const nombreLimpio = nombreCompleto.replace('Dr. ', '').replace('Dra. ', '');
    const palabras = nombreLimpio.split(' ');
    if (palabras.length >= 2) {
      return (palabras[0].charAt(0) + palabras[1].charAt(0)).toUpperCase();
    }
    return palabras[0].charAt(0).toUpperCase();
  }

  irAAgendamiento() {
    document.getElementById('seccion-agendar')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

}
