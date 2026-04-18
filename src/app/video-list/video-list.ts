import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { VideoDTO } from '../../../models';
import { VideoService } from '../services/video-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  imports: [],
  templateUrl: './video-list.html',
  styleUrl: './video-list.css',
})
export class VideoList implements OnInit {


  videoService = inject(VideoService);
  router = inject(Router);

  videos = signal<VideoDTO[]>([]);
  cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.videoService.getAll().subscribe({
      next: (videos) => {
        this.videos.set(videos);
      },
      error: (error) => {
        console.error('Error fetching videos:', error);
      }
    });
  }

    editVideo(video: VideoDTO) {
      this.router.navigate(['/edit-video', video.id]);
    }
  
    deleteVideo(video: VideoDTO) {
      if (confirm(`Biztos törölni akarod a "${video.title}" c. DVD-t/Kazettát?`)) {
        this.videoService.deleteVideo(video.id).subscribe({
          next: () => {
            this.videos.set(this.videos().filter(v => v.id !== video.id));
            this.cdRef.markForCheck();
          },
          error: (err) => {
            console.error('Error deleting video:', err);
          }
        });
      }
    }

}