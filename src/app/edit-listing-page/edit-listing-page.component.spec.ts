import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditListingPageComponent } from './edit-listing-page.component';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

describe('EditListingPageComponent', () => {
  let component: EditListingPageComponent;
  let fixture: ComponentFixture<EditListingPageComponent>;
  let listingsServiceSpy: jasmine.SpyObj<ListingsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const fakeListing: Listing = {
    id: '1',
    name: 'Guitar',
    description: 'Acoustic guitar',
    price: 200,
    views: 3,
  };

  beforeEach(async () => {
    listingsServiceSpy = jasmine.createSpyObj('ListingsService', ['getListingById', 'editListing']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [EditListingPageComponent],
      providers: [
        { provide: ListingsService, useValue: listingsServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditListingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load listing on init', () => {
    listingsServiceSpy.getListingById.and.returnValue(of(fakeListing));
    component.ngOnInit();
    expect(listingsServiceSpy.getListingById).toHaveBeenCalledWith('1');
    expect(component.listing).toEqual(fakeListing);
  });

  it('should call editListing and navigate on submit', () => {
    component.listing = fakeListing;
    listingsServiceSpy.editListing.and.returnValue(of(fakeListing));


    component.onSubmit({
      name: 'Updated Guitar',
      description: 'Better guitar',
      price: 250,
    });

    expect(listingsServiceSpy.editListing).toHaveBeenCalledWith('1', 'Updated Guitar', 'Better guitar', 250);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/my-listings');
  });
});
