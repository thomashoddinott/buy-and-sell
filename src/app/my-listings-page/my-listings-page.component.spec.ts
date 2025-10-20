import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyListingsPageComponent } from './my-listings-page.component';
import { of } from 'rxjs';
import { ListingsService } from '../listings.service';
import { provideRouter } from '@angular/router';

class MockListingsService {
  getListingsForUser() {
    return of([
      { id: '1', name: 'Listing 1', description: 'Desc 1', price: 100 },
      { id: '2', name: 'Listing 2', description: 'Desc 2', price: 200 },
    ]);
  }
  deleteListing(id: string) {
    return of({});
  }
}

describe('MyListingsPageComponent', () => {
  let component: MyListingsPageComponent;
  let fixture: ComponentFixture<MyListingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListingsPageComponent],
      providers: [
        { provide: ListingsService, useClass: MockListingsService },
        provideRouter([]) // resolves ActivatedRoute for RouterLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyListingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
