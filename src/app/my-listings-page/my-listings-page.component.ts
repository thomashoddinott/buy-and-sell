import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-my-listings-page',
  standalone: true,
  imports: [RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css'
})
export class MyListingsPageComponent {
  listings: Listing[] | undefined;

  constructor(
    private listingsService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe((data) => {
      this.listings = data;
    });
  }

  onDeleteClicked(listingId: string): void {
    // this.listings = this.listings?.filter(listing => listing.id !== id);
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings?.filter(listing => listing.id !== listingId);
    }); 
  }
}
