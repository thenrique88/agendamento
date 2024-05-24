import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarAgendaComponent } from './configurar-agenda.component';

describe('ConfigurarAgendaComponent', () => {
  let component: ConfigurarAgendaComponent;
  let fixture: ComponentFixture<ConfigurarAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
