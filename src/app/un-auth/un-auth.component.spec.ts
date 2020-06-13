import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthComponent } from './un-auth.component';

describe('UnAuthComponent', () => {
  let component: UnAuthComponent;
  let fixture: ComponentFixture<UnAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
