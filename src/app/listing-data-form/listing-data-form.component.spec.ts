import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDataFormComponent } from './listing-data-form.component';
import { Router } from '@angular/router';

describe('ListingDataFormComponent', () => {
  let component: ListingDataFormComponent;
  let fixture: ComponentFixture<ListingDataFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListingDataFormComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDataFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields with input values', () => {
    component.currentName = 'Test Name';
    component.currentDescription = 'Test Description';
    component.currentPrice = '100';
    component.ngOnInit();

    expect(component.name).toBe('Test Name');
    expect(component.description).toBe('Test Description');
    expect(component.price).toBe('100');
  });

  it('should emit onSubmit with correct listing data', () => {
    spyOn(component.onSubmit, 'emit');

    component.name = 'Phone';
    component.description = 'Brand new';
    component.price = '250';

    component.onButtonClicked();

    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      id: '',
      name: 'Phone',
      description: 'Brand new',
      price: 250,
      views: 0
    });
  });
});
