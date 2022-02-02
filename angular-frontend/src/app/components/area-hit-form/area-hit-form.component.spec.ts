import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHitFormComponent } from './area-hit-form.component';

describe('AreaHitFormComponent', () => {
  let component: AreaHitFormComponent;
  let fixture: ComponentFixture<AreaHitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaHitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
