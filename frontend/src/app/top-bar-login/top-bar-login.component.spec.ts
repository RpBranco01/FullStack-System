import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLoginComponent } from './top-bar-login.component';

describe('TopBarLoginComponent', () => {
  let component: TopBarLoginComponent;
  let fixture: ComponentFixture<TopBarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
