import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMedicos } from './buscador-medicos';

describe('BuscadorMedicos', () => {
  let component: BuscadorMedicos;
  let fixture: ComponentFixture<BuscadorMedicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorMedicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorMedicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
