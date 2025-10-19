import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe], // 👈 add CommonModule here
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css'], // 👈 also fix the plural property name
})
export class ListingDetailPageComponent implements OnInit {
  isLoading = true;
  listing?: Listing;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.listingsService.getListingById(id!).subscribe((data) => {
      this.listing = data;
      this.isLoading = false;
      this.listingsService
        .addViewToListing(id!)
        .subscribe(() => console.log('views updated'));
    });
  }
}
