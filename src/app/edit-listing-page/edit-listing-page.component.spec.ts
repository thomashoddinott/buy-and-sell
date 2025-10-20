import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditListingPageComponent } from './edit-listing-page.component';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from '../listings.service';

// Mock services
class MockListingsService {
  getListingById() {
    return of({ id: '1', name: 'Test', description: 'Test desc', price: 100 });
  }
  editListing() {
    return of({});
  }
}

describe('EditListingPageComponent', () => {
  let component: EditListingPageComponent;
  let fixture: ComponentFixture<EditListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditListingPageComponent, ListingDataFormComponent, CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: ListingsService, useClass: MockListingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
