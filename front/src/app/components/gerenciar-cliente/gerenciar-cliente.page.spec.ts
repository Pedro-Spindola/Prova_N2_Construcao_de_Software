import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarClientePage } from './gerenciar-cliente.page';

describe('GerenciarClientePage', () => {
  let component: GerenciarClientePage;
  let fixture: ComponentFixture<GerenciarClientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarClientePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
