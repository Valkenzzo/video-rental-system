import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { CustomerDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CustomerDTO[]>('/api/customer');


  }

  getOne(id: number){
    return this.http.get<CustomerDTO>(`/api/customer/${id}`);
  }

  toggleCustomerActivation(customer: CustomerDTO) {
      return this.http.put<CustomerDTO>('/api/customer',  { ...customer, isActive: !customer.isActive });
  }

  createCustomer(customer: CustomerDTO) {
    return this.http.post<CustomerDTO>('/api/customer', customer);
  }

   updateCustomer(customer: CustomerDTO) {
    return this.http.put<CustomerDTO>('/api/customer', customer);
  }
}
