import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoNegadoPage } from './acesso-negado.page';

describe('AcessoNegadoPage', () => {
  let component: AcessoNegadoPage;
  let fixture: ComponentFixture<AcessoNegadoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoNegadoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoNegadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
