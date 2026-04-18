import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CustomerDTO } from '../../../models';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-editor',
  imports: [FormsModule,CommonModule],
  templateUrl: './customer-editor.html',
  styleUrl: './customer-editor.css',
})
export class CustomerEditor implements OnInit {

  customer: CustomerDTO = {
    id: 0,
    name: '',
    phone: '',
    idCardNumber: '',
    address: '',
    isActive: true
  };

  customerService = inject(CustomerService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);

  isNewCustomer = true;



  ngOnInit(): void {
    const customerId = this.activatedRoute.snapshot.params['id'];

    if (customerId) {
      this.isNewCustomer = false;
      this.customerService.getOne(customerId).subscribe({
        next: (customer) => {
          this.customer = customer;
          this.cdRef.markForCheck();
        },
        error: (err) => {
          alert('Hiba az ügyfél betöltése során');
          console.log(err);
        }
      });

    }
  }


  saveCustomer() {

    if (this.isNewCustomer) {
      this.customerService.createCustomer(this.customer).subscribe({

        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {

          alert(err.error.error || 'Hiba az ügyfél létrehozása során');
          console.log(err);
        }
      });
    } else{
       this.customerService.updateCustomer(this.customer).subscribe({

        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          alert(err.message || 'Hiba az ügyfél frissítése során');
          console.log(err);
        }
      });
    }

  }

  cancelEdit(){
    this.router.navigateByUrl('/');
  }



}
