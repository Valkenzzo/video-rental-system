import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { VideoDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<VideoDTO[]>('/api/video');


  }

  getOne(id: number){
    return this.http.get<VideoDTO>(`/api/video/${id}`);
  }

  createVideo(video: VideoDTO) {
    return this.http.post<VideoDTO>('/api/video', video);
  }

   updateVideo(video: VideoDTO) {
    return this.http.put<VideoDTO>('/api/video', video);
  }

  deleteVideo(id: number) {
    return this.http.delete(`/api/video/${id}`);
  }
}
