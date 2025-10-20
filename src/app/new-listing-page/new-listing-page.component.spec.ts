import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewListingPageComponent } from './new-listing-page.component';
import { of } from 'rxjs';
import { ListingsService } from '../listings.service';
import { Router } from '@angular/router';
import { Listing } from '../types';

class MockListingsService {
  createListing(name: string, description: string, price: number) {
    return of({ id: '1', name, description, price });
  }
}

describe('NewListingPageComponent', () => {
  let component: NewListingPageComponent;
  let fixture: ComponentFixture<NewListingPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [NewListingPageComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ListingsService, useClass: MockListingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
