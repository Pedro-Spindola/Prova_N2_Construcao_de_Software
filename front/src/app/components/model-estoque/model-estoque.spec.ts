import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEstoque } from './model-estoque';

describe('ModelEstoque', () => {
  let component: ModelEstoque;
  let fixture: ComponentFixture<ModelEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelEstoque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelEstoque);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
