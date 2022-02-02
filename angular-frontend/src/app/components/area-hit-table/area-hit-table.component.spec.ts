import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHitTableComponent } from './area-hit-table.component';

describe('AreaHitTableComponent', () => {
  let component: AreaHitTableComponent;
  let fixture: ComponentFixture<AreaHitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaHitTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
