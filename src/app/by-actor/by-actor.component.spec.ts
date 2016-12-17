/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ByActorComponent } from './by-actor.component';

describe('ByActorComponent', () => {
  let component: ByActorComponent;
  let fixture: ComponentFixture<ByActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
