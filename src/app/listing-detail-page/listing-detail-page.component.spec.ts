import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDetailPageComponent } from './listing-detail-page.component';
import { ListingsService } from '../listings.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Listing } from '../types';

describe('ListingDetailPageComponent', () => {
  let component: ListingDetailPageComponent;
  let fixture: ComponentFixture<ListingDetailPageComponent>;
  let listingsServiceSpy: jasmine.SpyObj<ListingsService>;

  const mockListing: Listing = {
    id: '1',
    name: 'Guitar',
    description: 'Nice acoustic guitar',
    price: 200,
    views: 10
  };

  beforeEach(async () => {
    listingsServiceSpy = jasmine.createSpyObj('ListingsService', [
      'getListingById',
      'addViewToListing'
    ]);

    await TestBed.configureTestingModule({
      imports: [ListingDetailPageComponent],
      providers: [
        { provide: ListingsService, useValue: listingsServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load listing and update views on init', () => {
    listingsServiceSpy.getListingById.and.returnValue(of(mockListing));
    listingsServiceSpy.addViewToListing.and.returnValue(of(void 0));

    component.ngOnInit();

    expect(listingsServiceSpy.getListingById).toHaveBeenCalledWith('1');
    expect(component.listing).toEqual(mockListing);
    expect(component.isLoading).toBeFalse();
    expect(listingsServiceSpy.addViewToListing).toHaveBeenCalledWith('1');
  });
});
