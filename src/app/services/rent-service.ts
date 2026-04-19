import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RentDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class RentService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<RentDTO[]>('/api/rent');


  }

  getOne(id: number){
    return this.http.get<RentDTO>(`/api/rent/${id}`);
  }

  createRent(rent: RentDTO) {
    return this.http.post<RentDTO>('/api/rent', rent);
  }

}
