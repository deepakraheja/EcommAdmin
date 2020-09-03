import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MngAgentComponent } from './mng-agent.component';

describe('MngAgentComponent', () => {
  let component: MngAgentComponent;
  let fixture: ComponentFixture<MngAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MngAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MngAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
