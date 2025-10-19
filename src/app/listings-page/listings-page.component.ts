import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './listings-page.component.html',
  styleUrl: './listings-page.component.css',
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getListings().subscribe((data) => {
      this.listings = data;
      console.log('Listings fetched:', this.listings);
    }); 
  }
}
