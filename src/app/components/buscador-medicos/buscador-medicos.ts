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
  // 1. Inyectamos tu servicio conectado a Firestore
  private medicosService = inject(Medicos);
  
  // 2. Traemos los médicos en tiempo real y los transformamos en un Signal nativo
  medicosBD = toSignal(this.medicosService.obtenerMedicos(), { initialValue: [] });

  // 3. Signal para manejar el texto de búsqueda del usuario
  terminoBusqueda = signal('');

  // 4. El motor inteligente: Filtra en tiempo real Y ORDENA jerárquicamente
  medicosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase();
  
    // 1. IMPORTANTE: Ponemos las claves de búsqueda en MINÚSCULAS y palabras clave sencillas
    const prioridades: { [key: string]: number } = {
      'cardiolog': 1, // Captura "Cardióloga Clínica", "Cardiología", etc.
      'vascular': 2,  // Captura "Cirugía Vascular"
      'nefrol': 3     // Captura "Nefrologo", "Nefrología"
    };

    // Paso A: Filtramos la base de datos (Usamos 'medico: any' para eliminar el error de compilación)
    const medicosFiltradosBase = this.medicosBD().filter((medico: any) => {
      const nombreMedico = (medico.nombre || '').toLowerCase();
      const textEspecialidad = (medico.especialidad || '').toLowerCase();
      return nombreMedico.includes(termino) || textEspecialidad.includes(termino);
    });

    // Paso B: Ordenamos el resultado filtrado basándose en el mapa de prioridades
    return medicosFiltradosBase.sort((a: any, b: any) => {
      const espA = (a.especialidad || '').toLowerCase();
      const espB = (b.especialidad || '').toLowerCase();

      // Buscamos cuál clave de nuestro mapa (en minúsculas) está incluida en la especialidad
      const claveA = Object.keys(prioridades).find(key => espA.includes(key));
      const claveB = Object.keys(prioridades).find(key => espB.includes(key));

      // Si se encuentra la coincidencia se asigna su peso (1, 2 o 3), si no, va al final (99)
      const pesoA = claveA ? prioridades[claveA] : 99;
      const pesoB = claveB ? prioridades[claveB] : 99;

      return pesoA - pesoB;
    });
  });

  // Función para obtener las iniciales del médico (para el avatar)
 obtenerIniciales(nombreCompleto: string): string {
    if (!nombreCompleto) return '';
    // Limpiamos los títulos profesionales para sacar las iniciales reales del nombre
    const nombreLimpio = nombreCompleto.replace('Dr. ', '').replace('Dra. ', '');
    const palabras = nombreLimpio.split(' ').filter(p => p.trim() !== '');

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
