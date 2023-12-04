import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubscriptionCard } from 'src/app/models/SubscriptionCard';


@Component({
  selector: 'app-subscription-plan-card',
  templateUrl: './subscription-plan-card.component.html',
  styleUrls: ['./subscription-plan-card.component.css']
})
export class SubscriptionPlanCardComponent {

  @Input('cardData')cardData!: SubscriptionCard;
}
