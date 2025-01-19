import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoProfissionalComponent } from './descricao-profissional.component';

describe('DescricaoProfissionalComponent', () => {
  let component: DescricaoProfissionalComponent;
  let fixture: ComponentFixture<DescricaoProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescricaoProfissionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescricaoProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
