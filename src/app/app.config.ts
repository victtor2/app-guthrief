import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. ¡Aquí deben estar las importaciones de Firebase!
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// 2. Aquí abajo verás tus credenciales reales de la nube (las que creó Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCVUGxL_hIdH2VXSrh92vX2nODG948VPbY",
  authDomain: "app-institutogf.firebaseapp.com",
  projectId: "app-institutogf",
  storageBucket: "app-institutogf.firebasestorage.app",
  messagingSenderId: "932821798326",
  appId: "1:932821798326:web:7377c07c8b7bb98b4f8517"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    // 3. ¡Los proveedores inyectados en la aplicación!
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
