import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFuncionarioPage } from './gerenciar-funcionario.page';

describe('GerenciarFuncionarioPage', () => {
  let component: GerenciarFuncionarioPage;
  let fixture: ComponentFixture<GerenciarFuncionarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarFuncionarioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarFuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
