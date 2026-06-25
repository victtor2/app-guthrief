import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Definimos la estructura exacta que tendrá el documento en la base de datos
export interface Medico {
  id?: string;
  nombre: string;
  especialidad: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class Medicos {
  // Inyectamos Firestore usando la nueva sintaxis de Angular 20
  private firestore = inject(Firestore);

  // Esta función va a traer a todos los médicos que estén en la nube
  obtenerMedicos(): Observable<Medico[]> {
    const medicosRef = collection(this.firestore, 'medicos');
    // collectionData nos devuelve un Observable que se actualiza solo si cambias algo en Firebase
    return collectionData(medicosRef, { idField: 'id' }) as Observable<Medico[]>;
  }

  // ¡Nueva función para guardar las citas en una colección llamada 'citas'!
  guardarCita(datosCita: any): Promise<any> {
    const citasRef = collection(this.firestore, 'citas');
    return addDoc(citasRef, datosCita);
  }
}
