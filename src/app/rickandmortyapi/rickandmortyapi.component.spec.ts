import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RickandmortyapiComponent } from './rickandmortyapi.component';

describe('RickandmortyapiComponent', () => {
  let component: RickandmortyapiComponent;
  let fixture: ComponentFixture<RickandmortyapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RickandmortyapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RickandmortyapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
