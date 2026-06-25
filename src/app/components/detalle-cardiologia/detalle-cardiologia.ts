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
      subtitulo: 'Soluciones definitivas para el sistema circulatorio periférico',
      descripcion: 'Ofrecemos tratamientos de vanguardia para trastornos arteriales y venosos, combinando técnicas quirúrgicas tradicionales con procedimientos endovasculares mínimamente invasivos y estéticos.',
      icono: '🩸',
      procedimientos: ['Tratamiento láser avanzado de várices', 'Escleroterapia guiada para arañitas vasculares', 'Manejo integral de úlceras varicosas', 'Ecocardiograma Doppler Venoso y Arterial'],
      medicos: [
        { nombre: 'Dra. Karina Garzón', cargo: 'Cirujana Vascular y Endovascular', imagen: 'images/karina.png' },
        { nombre: 'Dra. Fernanda Escobar', cargo: 'Cirujana Vascular y Endovascular', imagen: 'images/fernanda.png' }
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
    'nefrologia': {
      titulo: 'Nefrología Especializada',
      subtitulo: 'Protección y cuidado integral de tu salud renal',
      descripcion: 'El riñón y el corazón trabajan de la mano. Evaluamos y tratamos de manera sistémica afecciones como la insuficiencia renal, control integral de hipertensión arterial refractaria y nefropatía diabética.',
      icono: '🧬',
      procedimientos: ['Prevención y freno de Insuficiencia Renal', 'Manejo de Nefropatía Diabética e Hipertensiva', 'Tratamiento de Infecciones Urinarias Recurrentes', 'Coordinación de Terapias de Reemplazo Renal'],
      medicos: [
        { nombre: 'Dr. Harold Álvarez', cargo: 'Nefrólogo Clínico', imagen: 'images/doctor_defecto.png' }
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