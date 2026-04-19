import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerDTO, RentDTO, VideoDTO } from '../../../models';
import { CustomerService } from '../services/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../services/video-service';
import { RentService } from '../services/rent-service';

@Component({
  selector: 'app-rent-editor',
  imports: [FormsModule, CommonModule],
  templateUrl: './rent-editor.html',
  styleUrl: './rent-editor.css',
})
export class RentEditor implements OnInit {


  customerId: string = '';
  videoId: string = '';
  customers: CustomerDTO[] = [];
  videos: VideoDTO[] = [];
 selectedCustomer: CustomerDTO | null = null;
  
  foundCustomer = signal(false);


  customerService = inject(CustomerService);
  videoService = inject(VideoService);
  rentService = inject(RentService);

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {

    this.loadCustomers();
    this.loadVideos();

  }

  loadCustomers() {

    this.customerService.getAll().subscribe({
      next: (customers) => {

        this.customers = customers;


      },
      error: (err) => {
        alert('Hiba az ügyfelek betöltése során');
        console.log(err);
      }
    });
  }

  loadVideos() {

    this.videoService.getAll().subscribe({
      next: (videos) => {
        this.videos = videos;
      },
      error: (err) => {
        alert('Hiba a videók betöltése során');
        console.log(err);
      }
    });
  }

  approveCustomer() {

    const customer = this.customers.find(c => c.id === Number(this.customerId));
    if (customer) {
      this.selectedCustomer = customer;
      this.foundCustomer.set(true);


    } else {

      alert('Nincs ilyen azonosítójú ügyfél');
      this.foundCustomer.set(false);
    }
  }

  saveRent() {

    const video = this.videos.find(v => v.id === Number(this.videoId));
    
    if (!video) {
      alert('Nincs ilyen azonosítójú video');
      return;
    }

    const newRent: RentDTO = {
      id: 0, // This will be set by the backend
      customer: this.selectedCustomer!,
      video: video,
      rentDate: new Date(),
      returnDate: null,
      isActive: true
    };

    this.rentService.createRent(newRent).subscribe({
      next: () => {
        //alert('Kölcsönzés sikeresen létrehozva');
        this.router.navigateByUrl('/rents');
      },
      error: (err) => {
        alert('Hiba a kölcsönzés létrehozása során');
        console.log(err);
      }
    });
  }

  back() {
    this.foundCustomer.set(false);
  }
}