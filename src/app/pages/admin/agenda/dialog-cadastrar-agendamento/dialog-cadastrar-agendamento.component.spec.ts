import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastrarAgendamentoComponent } from './dialog-cadastrar-agendamento.component';

describe('DialogCadastrarAgendamentoComponent', () => {
  let component: DialogCadastrarAgendamentoComponent;
  let fixture: ComponentFixture<DialogCadastrarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCadastrarAgendamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCadastrarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
