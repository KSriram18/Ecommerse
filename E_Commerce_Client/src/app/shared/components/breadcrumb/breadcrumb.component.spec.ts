import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      imports: [BreadcrumbModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check home', () => {
    expect(component.home).toEqual({ icon: 'pi pi-home', routerLink: '/' })
  })
});
