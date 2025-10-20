import { TestBed } from '@angular/core/testing';
import { ListingsService } from './listings.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListingsService', () => {
  let service: ListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] // <-- production module instead of testing module
    });
    service = TestBed.inject(ListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
