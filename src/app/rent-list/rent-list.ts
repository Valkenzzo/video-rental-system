import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDTO, RentDTO, VideoDTO } from '../../../models';
import { CustomerService } from '../services/customer-service';
import { RentService } from '../services/rent-service';
import { VideoStatus } from '../../../models/enums';
import { VideoService } from '../services/video-service';

@Component({
  selector: 'app-rent-list',
  imports: [],
  templateUrl: './rent-list.html',
  styleUrl: './rent-list.css',
})
export class RentList implements OnInit {


  rentService = inject(RentService);
  videoService = inject(VideoService);
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
          this.rents.update((rents) => rents.filter((r) => r.id !== rent.id));
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
}