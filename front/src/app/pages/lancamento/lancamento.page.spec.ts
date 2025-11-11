import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoPage } from './lancamento.page';

describe('LancamentoPage', () => {
  let component: LancamentoPage;
  let fixture: ComponentFixture<LancamentoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
