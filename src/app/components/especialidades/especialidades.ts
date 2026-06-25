import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. ¡IMPORTAMOS EL CONECTOR DE RUTAS DE ANGULAR!
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-especialidades',
  // 2. ¡AQUÍ LO DECLARAMOS PARA QUE EL HTML LO ENTIENDA!
  imports: [CommonModule, RouterModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.scss',
})
export class Especialidades implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}