import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarProdutoPage } from './gerenciar-produto.page';

describe('GerenciarProdutoPage', () => {
  let component: GerenciarProdutoPage;
  let fixture: ComponentFixture<GerenciarProdutoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarProdutoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
