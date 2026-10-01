import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Estructura para tipar la información de forma limpia
interface Doctor {
  nombre: string;
  cargo: string;
  imagen: string;
}

interface EspecialidadInfo {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  icono: string;
  procedimientos: string[];
  medicos: Doctor[];
}

@Component({
  selector: 'app-detalle-cardiologia',
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-cardiologia.html',
  styleUrl: './detalle-cardiologia.scss',
})
export class DetalleCardiologia implements OnInit {
  
 especialidadId: string | null = '';
  datosEspecialidad: EspecialidadInfo | undefined;

  // Base de datos local para alimentar la vista dinámicamente
  baseDeDatos: Record<string, EspecialidadInfo> = {
    'cardiologia': {
      titulo: 'Cardiología Clínica',
      subtitulo: 'Cuidado sistémico de alta fidelidad para tu corazón',
      descripcion: 'Nuestra unidad de Cardiología Clínica se enfoca en la prevención, diagnóstico temprano y tratamiento oportuno de enfermedades cardiovasculares. Evaluamos minuciosamente cada factor de riesgo para proteger tu vida.',
      icono: '🩺',
      procedimientos: ['Electrocardiograma (EKG) de alta resolución', 'Monitoreo de Presión Arterial (MAPA)', 'Control de Hipertensión Crónica', 'Evaluación Preoperatoria Cardiovascular'],
      medicos: [
        { nombre: 'Dra. Verónica López', cargo: 'Especialista en Cardiología y Riesgo Vascular', imagen: 'images/vero.png' }
      ]
    },
    'cirugia-vascular': {
      titulo: 'Cirugía Vascular y Endovascular',
      subtitulo: 'Nuestro objetivo es mejorar el flujo sanguíneo y previnir complicaciones mortales o de amputación',
      descripcion: 'Ofrecemos tratamientos de vanguardia para prevenir, diagnosticar y tratar enfermedades de los vasos sanguíneos; combinando procedimientos y terapias vasculares, endovasculares con tecnología de punta.',
      icono: '🩸',
      procedimientos: ['Diagnosticar trastornos arteriales, venosos y linfáticos.', 'Tratamientos de varices en miembros inferiores de avanzada.', 'Creación y confección de accesos vasculares para hemodiálisis.', 'Identificación y tratamiento en lesiones de "Pie Diabético".', 'Ecografías vasculares: Carótidas, Aorticas, Arterias periféricas, Doppler venoso.'],
      medicos: [
        { nombre: 'Dra. Fernanda Escobar', cargo: 'Cirujana Vascular y Endovascular', imagen: 'images/fernanda.png' },
        { nombre: 'Dra. Karina Garzón', cargo: 'Cirujana Vascular y Endovascular', imagen: 'images/karina.png' }
      ]
    },
    'hemodinamia': {
      titulo: 'Hemodinamia e Intervencionismo',
      subtitulo: 'Tecnología médica inmediata para salvar vidas',
      descripcion: 'Contamos con una unidad especializada en estudios endovasculares mínimos. Realizamos cateterismos y diagnósticos intracardíacos con precisión milimétrica bajo los más estrictos estándares internacionales.',
      icono: '❤️',
      procedimientos: ['Cateterismo Cardíaco Diagnóstico', 'Angioplastia Coronaria con colocación de Stent', 'Estudios Endovasculares Avanzados', 'Atención de Emergencias Coronarias 24/7'],
      medicos: [
        { nombre: 'Dra. Paulina Cisneros', cargo: 'Cardióloga Clínica/Hemodinamista', imagen: 'images/paulina.png' }
      ]
    },
    'nutricion': {
      titulo: 'Nutrición y Dietética',
      subtitulo: 'Cuidado integral para tu salud nutricional',
      descripcion: 'Ofrecemos evaluaciones nutricionales completas diseñadas para cuidar tu salud de forma proactiva, con planes de alimentación personalizados y seguimiento continuo.',
      icono: '🥗',
      procedimientos: ['Evaluación Nutricional Integral', 'Planificación de Alimentación Clínica', 'Control Metabólico', 'Asesoría Especializada para Estilo de Vida Saludable'],
      medicos: [
        { nombre: 'Dra. Samantha Cueller', cargo: 'Nutricionista Clínica', imagen: 'images/samantha.png' }
      ]
    }
  };

  // Inyectamos ActivatedRoute para leer los parámetros de la URL
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Escuchamos la URL para cargar la data correcta
    this.route.paramMap.subscribe(params => {
      this.especialidadId = params.get('id');
      if (this.especialidadId) {
        this.datosEspecialidad = this.baseDeDatos[this.especialidadId];
      }
    });
  }
}