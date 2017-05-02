import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

import 'rxjs/add/operator/debounceTime';

import { Promotion } from '../entities/promotion';
import {PromotionService} from '../services/promotion.service';

@Component({
    selector: 'promotions',
    templateUrl: 'promotions.component.html',
    styleUrls:['promotions.component.css'],
    providers: [Md5,PromotionService]
})
export class PromotionsMangementComponent implements OnInit {
    promotionForm: FormGroup;
    promotion: Promotion = new Promotion();
    emailMessage: string;
    passwordMessage: string;
    errorMessage:string;
    Promotions:Promotion[];
    p: number = 1;


    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder,private _md5: Md5,private _PromotionService: PromotionService ) { }

    ngOnInit(): void {
        this._PromotionService.getPromotions()    
        .subscribe(promotions => {
            this.Promotions=promotions;
                    },
                              error => this.errorMessage = <any>error);

        this.promotionForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            partner: ['', [Validators.required, Validators.maxLength(50)]],
            status: 'active',
            type: ['', [Validators.required, Validators.maxLength(50)]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            description: '',
        });

    }

    save(): void {
        let promotion =new Promotion(this.promotionForm.get('name').value,this.promotionForm.get('partner').value,this.promotionForm.get('status').value,this.promotionForm.get('type').value
        ,this.promotionForm.get('description').value,this.promotionForm.get('startDate').value,this.promotionForm.get('endDate').value);
        this._PromotionService.addPromotion(promotion);
        this.Promotions.push(promotion);
        this.promotionForm.reset();
        console.log('Saved: ' + JSON.stringify(promotion));
    }
    SetPromotionInForm(promotion:Promotion){
    this.promotion=promotion;
}

update(){
         let promotion =new Promotion(this.promotionForm.get('name').value,this.promotionForm.get('partner').value,this.promotionForm.get('status').value,this.promotionForm.get('type').value
        ,this.promotionForm.get('description').value,this.promotionForm.get('startDate').value,this.promotionForm.get('endDate').value);
        this._PromotionService.update(promotion);
}

delete(promotion:any){
    console.log(JSON.stringify(promotion));
    let id:string=promotion.id;
    this._PromotionService.deletePromotion(id).then(() => {
        this.Promotions = this.Promotions.filter(u => u !== promotion);
      });
}
    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    }


}

