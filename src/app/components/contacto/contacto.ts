import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto implements OnInit {
  miFormulario!: FormGroup;
  cargando: boolean = false; // Para deshabilitar el botón mientras se envía

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones básicas
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarFormulario(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); // Marca los campos vacíos en rojo si intentan enviar
      return;
    }

    this.cargando = true;

    // Vinculamos los datos de los inputs con las llaves {{name}}, {{email}} y {{message}} de tu EmailJS
    const datosTemplate = {
      name: this.miFormulario.value.nombre,
      email: this.miFormulario.value.correo,
      message: this.miFormulario.value.mensaje
    };

    emailjs.send(
      'service_syo7yk7',      // 👈 Tu Service ID que vimos en la imagen image_121e21.png
      'template_kwoscuq',       // 👈 Template ID que guardaste en EmailJS
      datosTemplate,
      'xPZRLR-ieyKcER9PC'         // 👈 Public Key de la sección Account de EmailJS
    )
    .then((response) => {
       console.log('¡Correo enviado con éxito, hermano!', response.status, response.text);
       alert('¡Tu mensaje ha sido enviado con éxito al Instituto! Nos comunicaremos pronto.');
       this.miFormulario.reset();
       this.cargando = false;
    })
    .catch((err) => {
       console.error('Huy hermanito, algo falló aquí:', err);
       alert('Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.');
       this.cargando = false;
    });
  }
}
