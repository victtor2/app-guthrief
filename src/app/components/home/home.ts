import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

// ¡AQUÍ ESTÁ EL TRUCO! Importamos Bootstrap directamente como un módulo
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit{

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {}

  ngAfterViewInit():void {
    // Verificamos que esté corriendo en el navegador (evita errores si usas SSR)
    if (isPlatformBrowser(this.platformId)) {
      const miCarrusel = document.getElementById('carouselPublicidad');
      if (miCarrusel) {
        // Inicializamos el carrusel de Bootstrap a la fuerza con un intervalo de 5 segundos
        new bootstrap.Carousel(miCarrusel, {
          interval: 5000,
          ride: 'carousel',
          wrap: true
        });
      }
    }
  } 

}
