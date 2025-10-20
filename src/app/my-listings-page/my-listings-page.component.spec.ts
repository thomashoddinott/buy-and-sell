import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyListingsPageComponent } from './my-listings-page.component';
import { ListingsService } from '../listings.service';
import { of } from 'rxjs';
import { Listing } from '../types';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyListingsPageComponent', () => {
  let component: MyListingsPageComponent;
  let fixture: ComponentFixture<MyListingsPageComponent>;
  let listingsServiceSpy: jasmine.SpyObj<ListingsService>;

  const mockListings: Listing[] = [
    { id: '1', name: 'Bookcase', description: 'Wooden shelf', price: 60, views: 12 },
    { id: '2', name: 'Bicycle', description: 'Mountain bike', price: 250, views: 5 },
  ];

  beforeEach(async () => {
    listingsServiceSpy = jasmine.createSpyObj('ListingsService', ['getListingsForUser', 'deleteListing']);
    listingsServiceSpy.getListingsForUser.and.returnValue(of(mockListings));
    listingsServiceSpy.deleteListing.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [MyListingsPageComponent, RouterTestingModule],
      providers: [{ provide: ListingsService, useValue: listingsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyListingsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user listings on init', () => {
    component.ngOnInit();
    expect(listingsServiceSpy.getListingsForUser).toHaveBeenCalled();
    expect(component.listings).toEqual(mockListings);
  });

  it('should delete a listing when onDeleteClicked is called', () => {
    component.listings = [...mockListings];
    component.onDeleteClicked('1');
    expect(listingsServiceSpy.deleteListing).toHaveBeenCalledWith('1');
    expect(component.listings).toEqual([mockListings[1]]);
  });
});
