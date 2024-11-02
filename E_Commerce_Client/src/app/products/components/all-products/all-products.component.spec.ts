import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AllProductsComponent } from './all-products.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AllProductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductsComponent, BreadcrumbComponent],
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check severity', () => {
    expect(component.getSeverity(50)).toBe('warning')
  })

  it('should check severity', () => {
    expect(component.getSeverity(100)).toBe('success')
  })

  it('should check round function', () => {
    expect(component.rating(45.5)).toBe(46)
  })

  it('should check round function', () => {
    expect(component.rating(45.1)).toBe(45)
  })

});
