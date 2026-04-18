import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { VideoDTO } from '../../../models';
import { VideoStatus } from '../../../models/enums';
import { VideoService } from '../services/video-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-editor',
  imports: [FormsModule,CommonModule],
  templateUrl: './video-editor.html',
  styleUrl: './video-editor.css',
})
export class VideoEditor implements OnInit {

  video: VideoDTO = {
    id: 0,
    title: '',
    dateOfPurchase: new Date(),
    status: VideoStatus.Free

  };

  videoService = inject(VideoService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNewVideo = true;

  ngOnInit(): void {

    const videoId = this.activatedRoute.snapshot.params['id'];

    if (videoId) {
      this.isNewVideo = false;
      this.videoService.getOne(videoId).subscribe({
        next: (video) => {
          this.video = video;
          this.cdRef.markForCheck();
        },
        error: (err) => {
          alert('Hiba a videó betöltése során');
          console.log(err);
        }
      });

    }

  }


  saveVideo() {

    if (this.isNewVideo) {
      this.videoService.createVideo(this.video).subscribe({

        next: () => {
          this.router.navigateByUrl('/videos');
        },
        error: (err) => {

          alert(err.message || 'Hiba a videó létrehozása során');
          console.log(err);
        }
      });
    } else {
      this.videoService.updateVideo(this.video).subscribe({

        next: () => {
          this.router.navigateByUrl('/videos');
        },
        error: (err) => {
          alert(err.message || 'Hiba a videó frissítése során');
          console.log(err);
        }
      });
    }

  }

  cancelEdit() {
    this.router.navigateByUrl('/videos');
  }

}
