import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPageComponent } from './contact-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;
  let mockListingsService: jasmine.SpyObj<ListingsService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const fakeListing: Listing = {
    id: '1',
    name: 'Guitar',
    description: 'A nice acoustic guitar',
    price: 199.99,
    views: 5,
  };

  beforeEach(async () => {
    mockListingsService = jasmine.createSpyObj('ListingsService', ['getListingById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [
        { provide: ListingsService, useValue: mockListingsService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load listing on init and set message', () => {
    mockListingsService.getListingById.and.returnValue(of(fakeListing));
    component.ngOnInit();

    expect(component.listing).toEqual(fakeListing);
    expect(component.message).toContain('guitar');
  });

  it('should alert and navigate when sendMessage is called', () => {
    spyOn(window, 'alert');
    component.sendMessage();

    expect(window.alert).toHaveBeenCalledWith('Message sent');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/listings');
  });
});
