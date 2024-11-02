import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpecificCategoryComponent } from './specific-category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SpecificCategoryComponent', () => {
  let component: SpecificCategoryComponent;
  let fixture: ComponentFixture<SpecificCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificCategoryComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpecificCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check round function', () => {
    expect(component.rating(45.5)).toBe(46)
  })

  it('should check round function', () => {
    expect(component.rating(45.1)).toBe(45)
  })
});
