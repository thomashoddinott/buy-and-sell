import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDetailPageComponent } from './listing-detail-page.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../listings.service';

class MockListingsService {
  getListingById() {
    return of({ id: '1', name: 'Test', description: 'Test desc', price: 100 });
  }
  addViewToListing() {
    return of({});
  }
}

describe('ListingDetailPageComponent', () => {
  let component: ListingDetailPageComponent;
  let fixture: ComponentFixture<ListingDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDetailPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ListingsService, useClass: MockListingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
