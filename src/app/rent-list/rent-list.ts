import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDTO, RentDTO } from '../../../models';
import { CustomerService } from '../services/customer-service';
import { RentService } from '../services/rent-service';

@Component({
  selector: 'app-rent-list',
  imports: [],
  templateUrl: './rent-list.html',
  styleUrl: './rent-list.css',
})
export class RentList implements OnInit {


  rentService = inject(RentService);
  router = inject(Router);

  rents = signal<RentDTO[]>([]);

  cdRef = inject(ChangeDetectorRef);


  ngOnInit(): void {

    this.rentService.getAll().subscribe({
      next: (rents) => {
        this.rents.set(rents);
        this.cdRef.markForCheck();
      },
      error: (err) => {
        alert('Hiba a kölcsönzések betöltése során');
        console.log(err);
      }
    });


  }



}
