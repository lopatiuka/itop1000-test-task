import { Component } from '@angular/core';
import { RateService } from '../services/main.service';
import { FormControl } from '@angular/forms';
import { IRate } from '../interfaces/rate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    inputCurrency = new FormControl();
    outputCurrency = new FormControl()

    constructor(private rateService: RateService) {}

    rates: IRate[] = [];

    getUahRates(): void {
        this.rateService.getUahRates()
        .subscribe(rates => this.rates = rates);
    }

    ngOnInit(): void {
        this.getUahRates();
    }
}
