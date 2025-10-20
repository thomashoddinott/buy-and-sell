import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingsPageComponent } from './listings-page.component';
import { ListingsService } from '../listings.service';
import { of } from 'rxjs';
import { Listing } from '../types';

describe('ListingsPageComponent', () => {
  let component: ListingsPageComponent;
  let fixture: ComponentFixture<ListingsPageComponent>;
  let listingsServiceSpy: jasmine.SpyObj<ListingsService>;

  const mockListings: Listing[] = [
    { id: '1', name: 'Bookcase', description: 'Wooden shelf', price: 60, views: 12 },
    { id: '2', name: 'Bicycle', description: 'Mountain bike', price: 250, views: 5 }
  ];

  beforeEach(async () => {
    listingsServiceSpy = jasmine.createSpyObj('ListingsService', ['getListings']);
    listingsServiceSpy.getListings.and.returnValue(of(mockListings));

    await TestBed.configureTestingModule({
      imports: [ListingsPageComponent],
      providers: [{ provide: ListingsService, useValue: listingsServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch listings on init', () => {
    component.ngOnInit();

    expect(listingsServiceSpy.getListings).toHaveBeenCalled();
    expect(component.listings).toEqual(mockListings);
  });
});
