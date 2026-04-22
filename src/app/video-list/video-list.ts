import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { VideoDTO } from '../../../models';
import { VideoService } from '../services/video-service';
import { Router } from '@angular/router';
import { RentService } from '../services/rent-service';
import { VideoStatus } from '../../../models/enums';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video-list',
  imports: [DatePipe],
  templateUrl: './video-list.html',
  styleUrl: './video-list.css',
})
export class VideoList implements OnInit {


  videoService = inject(VideoService);

  router = inject(Router);

  videos = signal<VideoDTO[]>([]);
  filteredVideos = signal<VideoDTO[]>([]);
  // Adjust the type as needed
  cdRef = inject(ChangeDetectorRef);

  idFilter = '';
  titleFilter = '';

  ngOnInit(): void {
    this.videoService.getAll().subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.filteredVideos.set(videos);
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      }
    });


  }

  editVideo(video: VideoDTO) {

    if (video.status === VideoStatus.Rented) {
      alert('Nem szerkesztheted ezt a videót, mert jelenleg ki van kölcsönözve.');
      return;
    }

    this.router.navigate(['/edit-video', video.id]);
  }

  deleteVideo(video: VideoDTO) {
    if (video.status === VideoStatus.Rented) {
      alert('Nem törölheted ezt a videót, mert jelenleg ki van kölcsönözve.');
      return;
    }

    if (!confirm(`Biztos törölni akarod a "${video.title}" c. DVD-t/Kazettát?`)) {
      return;
    }


    this.videoService.deleteVideo(video.id).subscribe({
      next: () => {
        this.videos.set(this.videos().filter(v => v.id !== video.id));
        this.filteredVideos.set(this.filteredVideos().filter(v => v.id !== video.id));
        this.cdRef.markForCheck();
      },
      error: (err) => {
        console.error('Error deleting video:', err);
      }
    });

  }

  searchId(event: Event) {
    this.idFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  searchTitle(event: Event) {
    this.titleFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    const result = this.videos().filter(v =>
      v.title.toLowerCase().includes(this.titleFilter) &&
      v.id.toString().includes(this.idFilter)
    );

    this.filteredVideos.set(result);
  }

}