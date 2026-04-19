import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../services/customer-service';
import { CustomerDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
})
export class CustomerList implements OnInit {

  customerService = inject(CustomerService);
  router = inject(Router);

  customers = signal<CustomerDTO[]>([]);
  filteredCustomers = signal<CustomerDTO[]>([]);
  cdRef = inject(ChangeDetectorRef);


  nameFilter = '';
  idCardFilter = '';
  idFilter = '';

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => {
        this.customers.set(customers);
        this.filteredCustomers.set(customers);
      },
      error: (err) => {
        alert('Hiba az ügyfelek betöltése során');
        console.log(err);
      }
    });

  }
  toggleCustomerActivation(customer: CustomerDTO) {

    this.customerService.toggleCustomerActivation(customer).subscribe({

      next: () => {
        const customers = this.customers();
        const index = customers.indexOf(customer);
        if (index > -1) {

          if(customer.rents.length > 0 && customer.isActive){
            alert('Nem lehet inaktiválni egy olyan ügyfelet, akinek van aktív kölcsönzése.');
            return;
          }
          
          customers[index].isActive = !customers[index].isActive;
          this.customers.set([...customers]);
          this.cdRef.markForCheck();
        }
      },
      error: (err) => {
        alert('Hiba az ügyfél módosítása során.');
        console.log(err);
      }


    });
  }

  editCustomer(customer: CustomerDTO) {
    this.router.navigate(['/edit-customer', customer.id]);
  }


  searchName(event: Event) {
    this.nameFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  searchIdCard(event: Event) {
    this.idCardFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  searchId(event: Event) {
    this.idFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    const result = this.customers().filter(c =>
      c.name.toLowerCase().includes(this.nameFilter) &&
      c.idCardNumber.toLowerCase().includes(this.idCardFilter) &&
      c.id.toString().includes(this.idFilter)
    );

    this.filteredCustomers.set(result);
  }

}
