import { Component, OnInit } from '@angular/core';
import { SubscriptionCard } from 'src/app/models/SubscriptionCard';
import { PlansService } from 'src/app/services/plans.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  data!: SubscriptionCard[];

  constructor(
    private planService: PlansService,
    private transactionService: TransactionService
  ) {  }

  ngOnInit(): void {
      this.planService.getPlans().subscribe((data)=> {
        this.data = data.data;
      })
  }

  initiateTransaction(id:number) {
    console.log(id);
    
    this.transactionService.initiateTransaction(id).subscribe();
  }

}
