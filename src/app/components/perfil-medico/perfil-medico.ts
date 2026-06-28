import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface PerfilCompleto {
  nombre: string;
  especialidad: string;
  subtitulo: string;
  imagen: string;
  resumen: string;
  estudios: string[];
  experiencia: string[];
}

@Component({
  selector: 'app-perfil-medico',
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil-medico.html',
  styleUrl: './perfil-medico.scss',
})
export class PerfilMedico implements OnInit{

  private route = inject(ActivatedRoute);
  
  medicoId: string | null = '';
  perfil: PerfilCompleto | undefined;

  // Base de datos extendida basada en la info clásica de su sitio anterior
  basePerfiles: Record<string, PerfilCompleto> = {
    // Si usas IDs numéricos de Firestore, usa esos IDs como claves (ej: '1', '2' o el ID autogenerado)
    'dra_veronica': {
      nombre: 'Dra. Verónica López',
      especialidad: 'Cardiología Clínica',
      subtitulo: 'Experta en Diagnóstico y Manejo de Enfermedades Cardíacas',
      imagen: 'images/vero.png',
      resumen: 'Experta en el diagnóstico y manejo de enfermedades cardíacas como hipertensión, insuficiencia cardíaca y arritmias. Acompaña a sus pacientes con un enfoque preventivo, promoviendo un corazón sano y una mejor calidad de vida.',
      estudios: [
        'Postgrado: ',
        'Especialista en Primer Grado en Cardiología - Universidad de Ciencias Médicas de La Habana – Cuba (2015)',
        
        'Pregrado: ',
        'Doctora en Medicina y Cirugía - Universidad Central del Ecuador – Ecuador (2005)',
        'Bachiller en Ciencias Médicas - Colegio Nacional 24 de Mayo – Ecuador (1996)'
      ],
      experiencia: [
        'Magíster en Cardio-Hemato-Oncología; Sociedad Española de Imagen Cardíaca – España (2021 - 2022).',
        'ACLS (Advanced Cardiac Life Support); Centro de Capacitación Salvando Vidas – Ecuador (2021) ',
        'II Jornadas Internacionales de Imagen Cardiaca; Universidad del Azuay – Ecuador (2021)',
        'Simposio Internacional de Insuficiencia Cardíaca; Sociedad Ecuatoriana de Cardiología – Ecuador (2021)',
        'I Jornadas de Arritmias Cardíacas; Sociedad Ecuatoriana e Interamericana de Cardiología – Ecuador (2021)',

      ]
    },

        'dra_karina': {
      nombre: 'Dra. Karina Garzón',
      especialidad: 'Cirujana Vascular',
      subtitulo: 'Especialista en Enfermedades del Sistema Circulatorio',
      imagen: 'images/karina.png',
      resumen: 'Especialista en enfermedades del sistema circulatorio, enfocada en el tratamiento de várices, accesos vasculares para hemodiálisis y patologías arteriales complejas. Su enfoque innovador permite procedimientos mínimamente invasivos con alta efectividad.',
      estudios: [
        'Postgrado: ',
        'Curso de Posgrado Avanzado en Hemodinamia y Cardiología Intervencionista (Cursando); Universidad de Buenos Aires (Argentina) - 2022',
        'Especialista en Angiología y Cirugía Vascular; Universidad Central del Ecuador - Ecuador (2014)',
        'Diploma Superior en Educación en Ciencias de la Salud; Universidad Central del Ecuador (Ecuador) - (2007)',
        'Pregrado: ',
        'Doctora en Medicina y Cirugía – Universidad Central del Ecuador (2006)',
        'Bachiller en Química Biólogo – Unidad Eduacativa "Manuela Cañizares", Ecuador (1997)'
      ],
      experiencia: [
        'He participado en cursos y seminarios en México, Ecuador, Colombia, EE.UU. y otros países, enfocándome en avances médicos, nuevas técnicas y tecnología aplicada a mi especialización. Estas experiencias han fortalecido mi conocimiento y enfoque profesional, permitiéndome ofrecer tratamientos actualizados y de alta calidad.',
        'Publicaciones Científicas: Ha publicado múltiples artículos en revistas científicas internacionales sobre enfermedades cardiovasculares. Algunos de sus estudios más recientes incluyen:',
        '"Modified Radial Technique" – Journal of Cardiology and Cardiovascular Research (2022)',
        '"The Efficacy of Paclitaxel Drug-Eluting Balloon Angioplasty" - European Heart Journal (2021)',
        '"Corrección Endovascular de Pseudoaneurisma de Aorta Postquirúrgica" - Revista Sociedad Ecuatoriana de Angiología y Cirugía Vascular (2010)',
        '"Estudio Costo Beneficio de la Colocación de Catéter con Reservorio Implantable" - Revista Sociedad Ecuatoriana de Angiología y Cirugía Vascular (2010)',
      ]
    },

        'dra_fernanda': {
      nombre: 'Dra. Fernanda Escobar',
      especialidad: 'Cirujana Vascular',
      subtitulo: 'Especialista en Enfermedades del Sistema Circulatorio',
      imagen: 'images/fernanda.png',
      resumen: 'Especialista en enfermedades del sistema circulatorio, enfocada en el tratamiento de várices, accesos vasculares para hemodiálisis y patologías arteriales complejas. Su enfoque innovador permite procedimientos mínimamente invasivos con alta efectividad.',
      estudios: [
        'Postgrado: ',
        'Curso de Posgrado Avanzado en Hemodinamia y Cardiología Intervencionista (Cursando); Universidad de Buenos Aires (Argentina) - 2022',
        'Especialista en Angiología y Cirugía Vascular - Universidad Central del Ecuador, 4 años',
        'Diploma Superior en Promoción y Prevención de la Salud – Universidad Regional Autónoma de los Andes, 1 año',
      
        'Pregrado: ',
        'Doctora en Medicina y Cirugía – Universidad Central del Ecuador',
        'Bachiller en Química Biólogo – 24 de Mayo High School, Ecuador'
      ],
      experiencia: [
        '2° Congreso Internacional de Atención Primaria en Medicina.',
        'Transcatheter Cardiovascular Therapeutics (2019)',
        '46th Annual Symposium on Vascular & Endovascular',
        'Congreso del Foro Venoso Latinoamericano',
        'Diplomado en Terapia Física para Linfedema',
        'Jornadas de Actualización en Insuficiencia Venosa',
        'Congreso Panamericano de Flebología y Linfología',
        'Congreso Circulación 2011',
        'XVII Congreso Ecuatoriano de Angiología y Cirugía Vascular',
        'XIV Congreso Ecuatoriano de Angiología y Cirugía Vascular',
        'Taller Internacional de Ecografía de Carótidas',

      ]
    },

        'dra_paulina': {
      nombre: 'Dra. Paulina Cisneros',
      especialidad: 'Cardiología Clínica/Hmoinamia y Carioangiología Intrvnionista',
      subtitulo: 'Especialista en Investigación Clínica',
      imagen: 'images/paulina.png',
      resumen: 'Experta en el diagnóstico y manejo de enfermedades cardíacas como Cardiopatía Isquémica, Infarto Agudo, Hipertensión arterial e Hipertensión Pulmonar, Insuficiencia Cardíaca, arritmias y patologias vasculares periféricas. Acompaña a sus pacientes con un enfoque preventivo, promoviendo un corazón sano y una mejor calidad de vida.',
      estudios: [
        'Postgrado: ',
        'Doctorando en Medicina (PhD) - Universidad de Buenos Aires, Argentina (2025)',
        'Especialista en Hemodinamia y Cardioangiología Intervencionista – Universidad de Buenos Aires, Argentina (2011)',
        'Especialidad en Cardiología – University of Havana, Cuba (2007)',
        'Especialista en Investigación Clínica – Universidad Abierta Interamericana, Argentina (2025)',
        'Pregrado: ',
        'Doctor en Medicina – Universidad de La Habana, Cuba (2002)',
        'Bachiller en Química Biólogo – 24 de Mayo High School, Ecuador (1997)'
      ],
      experiencia: [
        'Ha participado en múltiples cursos y congresos internacionales sobre Cardiología, Hemodinamia, Terapia endovascular y manejo de enfermedades cardiovasculares en países como Estados Unidos, Argentina, Brasil, México, Chile, España, Colombia entre otros.',
        'Publicaciones Científicas: Ha publicado múltiples artículos en revistas científicas internacionales sobre enfermedades cardiovasculares, terapia endovascular y hemodinamia. Algunos de sus estudios más recientes incluyen:',
        '"Influencia de la Hipertensión Pulmonar Secundaria en la Respuesta al Tratamiento en Insuficiencia Cardíaca" – Salud, Ciencia y Tecnología (2025)',
        '"Impacto de las Estrategias de Imagen y Tratamiento Farmacológico en la Taquicardia Ventricular Refractaria" – Cureus (2024)',
        '"Eficacia de los Dispositivos de Monitoreo Cardíaco Portátiles vs. Métodos Tradicionales" – Medicina (2024)',
        '"Evaluación de la Eficacia de la Embolización de Várices Pélvicas" – Revista Angiología (2016)',
        '"Pie Diabético en Hospitales de América Latina" – Revista Medicina (Buenos Aires) (2018)',

      ]
    },

        'dr_harold': {
      nombre: 'Dra. Harold Álvarez',
      especialidad: 'Nefrología',
      subtitulo: 'Especialista en nefrología diagnóstica, clínica, intervencionista y crítica.',
      imagen: 'images/nefro.png',
      resumen: 'La nefrología clínica, diagnóstica e intervencionista se centra en prevenir, diagnosticar y tratar enfermedades renales, metabólicas y autoinmunes, usando tanto métodos médicos como intervenciones especializadas, incluyendo manejo de pacientes críticos y terapias de reemplazo renal.',
      estudios: [
        'Postgrado: ',
        'Diplomado en Terapias de Reemplazo Renal en el Paciente Críticamente Enfermo - UNAM (2022)',
        'Maestría en Epidemiología y Salud Colectiva (egresado) – UASB (2022)',
        'Diplomatura Superior en Nefrología Clínica Ambulatoria – UNNA (2020)',
        'Especialización en Nefrología – UCE (2019)',
        'Diplomado en Hemodiálisis - ITSEM (2019)',
        'MBA con mención en Gerencia de Calidad y Productividad – PUCE (2016)',
        'Especialización en Gerencia de Salud – USFQ (2015)',

        'Pregrado: ',
        'Doctor en Medicina y Cirugía – Pontificia Universidad Católica, Ecuador (2014)',
      ],
      experiencia: [
        'Ha participado en múltiples cursos y congresos internacionales.'
      ]
    }

  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idUrl = params.get('id')?.toLowerCase() || '';
      this.medicoId = idUrl;
      
      // 🔍 ¡METE ESTE ESPÍA AQUÍ PARA VER QUÉ RECIBE LA URL!
      console.log("El ID que viene de la URL es:", idUrl);
      
      if (idUrl) {
        const llaveEncontrada = Object.keys(this.basePerfiles).find(llave => 
          llave === idUrl || idUrl.includes(llave.replace('dra_', '').replace('dr_', ''))
        );

        if (llaveEncontrada) {
          console.log("¡Se encontró coincidencia con la llave!", llaveEncontrada);
          this.perfil = this.basePerfiles[llaveEncontrada];
        } else {
          console.log("No se encontró la llave en la base local, saltando al fallback.");
          this.perfil = this.basePerfiles[idUrl] || this.basePerfiles['dra_paulina'];
        }
      }
    });
  }

}
