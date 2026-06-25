import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCardiologia } from './detalle-cardiologia';

describe('DetalleCardiologia', () => {
  let component: DetalleCardiologia;
  let fixture: ComponentFixture<DetalleCardiologia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCardiologia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCardiologia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
