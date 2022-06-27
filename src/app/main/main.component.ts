import { Component } from '@angular/core';
import { RateService } from '../services/main.service';
import { FormControl } from '@angular/forms';
import { IRate } from '../interfaces/rate';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

    constructor(private rateService: RateService) {}
    
    inputCurrency = new FormControl();
    outputCurrency = new FormControl()
    rate: IRate[] = [];
    currentRate: number = 0;
    inputValue = new FormControl();
    outputValue = new FormControl();

    getResult(rate: any, reverse?: boolean) {
        let keys = Object.keys( rate );
        this.currentRate = rate[keys[0]];

        if (!reverse) {
            let result = Number.parseFloat(this.inputValue.value) *  this.currentRate;
            this.outputValue.setValue(result.toFixed(2).toString());
        }
        else {
            let result = Number.parseFloat(this.outputValue.value) * this.currentRate;
            this.inputValue.setValue(result.toFixed( 2 ).toString());
        }
    }

    convert(reverse?: boolean): void {
        reverse ? this.rateService.getRate(this.outputCurrency.value, this.inputCurrency.value)
        .subscribe(rate => { 
            this.rate = rate 
            this.getResult(this.rate, reverse);
        }) : this.rateService.getRate(this.inputCurrency.value, this.outputCurrency.value)
        .subscribe(rate => { this.rate = rate 
            this.getResult(this.rate, reverse);
        });
    }

    ngOnInit() {
        this.inputCurrency.setValue("uah");
        this.outputCurrency.setValue("usd");
    }
}
