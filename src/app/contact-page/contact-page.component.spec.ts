import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPageComponent } from './contact-page.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../listings.service';

class MockListingsService {
  getListingById() {
    return of({ id: '1', name: 'Test Listing', description: 'Desc', price: 100 });
  }
}

describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Router, useValue: mockRouter }, // fully mocked router
        { provide: ListingsService, useClass: MockListingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
