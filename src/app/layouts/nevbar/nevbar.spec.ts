import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nevbar } from './nevbar';

describe('Nevbar', () => {
  let component: Nevbar;
  let fixture: ComponentFixture<Nevbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nevbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nevbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
