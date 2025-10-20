import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingsPageComponent } from './listings-page.component';
import { of } from 'rxjs';
import { ListingsService } from '../listings.service';
import { provideRouter } from '@angular/router';

class MockListingsService {
  getListings() {
    return of([
      { id: '1', name: 'Test 1', description: 'Desc 1', price: 100 },
      { id: '2', name: 'Test 2', description: 'Desc 2', price: 200 },
    ]);
  }
}

describe('ListingsPageComponent', () => {
  let component: ListingsPageComponent;
  let fixture: ComponentFixture<ListingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingsPageComponent],
      providers: [
        { provide: ListingsService, useClass: MockListingsService },
        provideRouter([]) // <-- resolves ActivatedRoute for RouterLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
