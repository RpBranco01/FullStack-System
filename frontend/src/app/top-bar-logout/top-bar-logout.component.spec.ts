import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLogoutComponent } from './top-bar-logout.component';

describe('TopBarLogoutComponent', () => {
  let component: TopBarLogoutComponent;
  let fixture: ComponentFixture<TopBarLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
