import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchProductsComponent } from './search-products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SearchProductsComponent', () => {
  let component: SearchProductsComponent;
  let fixture: ComponentFixture<SearchProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchProductsComponent, BreadcrumbComponent, SortPipe],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchProductsComponent);
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
