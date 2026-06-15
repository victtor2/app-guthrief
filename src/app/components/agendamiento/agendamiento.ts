import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { Medicos } from '../../services/medicos';

@Component({
  selector: 'app-agendamiento',
  imports: [CommonModule, ReactiveFormsModule], // ¡Vital importar ReactiveFormsModule!
  templateUrl: './agendamiento.html',
  styleUrl: './agendamiento.scss',
})
export class Agendamiento {

  // Inyectamos el servicio de médicos
  private medicosService = inject(Medicos);
  
  // 1. Definimos la estructura y reglas (validaciones) de nuestro formulario
  formularioCita = new FormGroup({
    nombrePaciente: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    tipoCita: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    sintomas: new FormControl('') // Este lo dejamos sin validaciones porque es opcional
  });

  // 2. Función que se dispara al presionar "Confirmar Solicitud"
  async agendar() {
    if (this.formularioCita.valid) {
      try {
        // Enviamos los datos del formulario directamente a Firebase
        await this.medicosService.guardarCita(this.formularioCita.value);
        
        alert('¡Excelente, hermanito! Cita agendada y guardada en Firebase con éxito.');
        this.formularioCita.reset(); // Limpiamos los campos
      } catch (error) {
        console.error('Error al guardar la cita:', error);
        alert('Hubo un problema al guardar la cita en la nube.');
      }
    } else {
      alert('Por favor, completa correctamente todos los campos obligatorios.');
    }
  }
}
