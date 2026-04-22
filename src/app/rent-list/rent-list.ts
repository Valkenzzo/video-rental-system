import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDTO, RentDTO, VideoDTO } from '../../../models';
import { CustomerService } from '../services/customer-service';
import { RentService } from '../services/rent-service';
import { VideoStatus } from '../../../models/enums';
import { VideoService } from '../services/video-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rent-list',
  imports: [DatePipe],
  templateUrl: './rent-list.html',
  styleUrl: './rent-list.css',
})
export class RentList implements OnInit {


  rentService = inject(RentService);
  videoService = inject(VideoService);
  router = inject(Router);

  rents = signal<RentDTO[]>([]);
  filteredRents = signal<RentDTO[]>([]);

  cdRef = inject(ChangeDetectorRef);

  customerIdFilter = '';
  videoIdFilter = '';
  lateFilter = '';


  ngOnInit(): void {

    this.rentService.getAll().subscribe({
      next: (rents) => {

        const setLaterents = rents.map(rent => {
          rent.isLate = this.checkLate(rent);
          return rent;
        });

        this.rents.set(setLaterents);
        this.filteredRents.set(setLaterents);
        // this.cdRef.markForCheck();

      },
      error: (err) => {
        alert('Hiba a kölcsönzések betöltése során');
        console.log(err);
      }
    });


  }

  markAsReturned(video: VideoDTO): void {
    video.status = VideoStatus.Free;
    this.videoService.updateVideo(video).subscribe({
      next: () => {

      },
      error: (err) => {
        alert('Hiba a videó státuszának frissítése során');
        console.log(err);
      }
    });

  }

  deleteRent(rent: RentDTO): void {
    if (confirm('Biztosan törölni szeretnéd a kölcsönzést?')) {
      this.rentService.delete(rent.id).subscribe({
        next: () => {
          const updated = this.rents().filter(r => r.id !== rent.id);

          this.rents.set(updated);
          this.filteredRents.set(updated);

          this.markAsReturned(rent.video);

          this.cdRef.markForCheck();
        },
        error: (err) => {
          alert('Hiba a kölcsönzés törlése során');
          console.log(err);
        }
      });
    }
  }


  checkLate(rent: RentDTO): boolean {

    const today = new Date();
    const rentDate = new Date(rent.rentDate);
    const diffTime = today.getTime() - rentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1; // Például, ha a kölcsönzés több mint 1 napja történt

    return false;
  }


  searchCustomerId(event: Event) {
    this.customerIdFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  searchVideoId(event: Event) {
    this.videoIdFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  searchLate(event: Event) {
    this.lateFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    const result = this.rents().filter(r =>
      r.customer.id.toString().includes(this.customerIdFilter) &&
      r.video.id.toString().includes(this.videoIdFilter) &&
      (
        r.isLate
          ? 'igen'.includes(this.lateFilter)
          : 'nem'.includes(this.lateFilter)
      )
    );

    this.filteredRents.set(result);
  }
}