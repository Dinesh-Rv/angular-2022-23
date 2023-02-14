import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarCategoryComponent } from './side-bar-category.component';

describe('SideBarCategoryComponent', () => {
  let component: SideBarCategoryComponent;
  let fixture: ComponentFixture<SideBarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
