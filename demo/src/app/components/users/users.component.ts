import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

import 'rxjs/add/operator/debounceTime';

import { User } from '../entities/user';
import {AccountService} from '../services/account.service';



function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
 }
 
function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let passwordControl = c.get('password');
    let confirmControl = c.get('confirmPassword');

    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (passwordControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
 }


@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls:['users.component.css'],
    providers: [Md5,AccountService]
})
export class UsersMangementComponent implements OnInit {
    customerForm: FormGroup;
    account: User = new User();
    emailMessage: string;
    passwordMessage: string;
    errorMessage:string;
    Accounts:User[];
    p: number = 1;
    
    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder,private _md5: Md5,private _AccountService: AccountService ) { }

    ngOnInit(): void {
        this._AccountService.getAccounts()    
        .subscribe(users => {
            this.Accounts=users;
                    },
                              error => this.errorMessage = <any>error);

        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            userName: ['', [Validators.required, Validators.maxLength(50)]],
            birthdate: ['', [Validators.required]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', Validators.required],
            }, {validator: emailMatcher}),
            passwordGroup: this.fb.group({
                password: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
            }, {validator: passwordMatcher}),
            phone: ['',[Validators.required, Validators.maxLength(50)]],
            status: 'active',
            gender: 'nonspecified',
            address:this.fb.group({
                city:'',
                state:'',
                zip:''
            })
        });

        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(1000).subscribe(value =>
            this.setMessage(emailControl));
    }

    populateTestData(): void {
        this.customerForm.patchValue({
            firstName: 'Jack',
            lastName: 'Harkness',
            emailGroup: {email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com'}
        });
    }

    save(): void {
        let user =new User(this.customerForm.get('userName').value,this.customerForm.get('firstName').value,this.customerForm.get('lastName').value,this.customerForm.get('emailGroup.email').value
        ,this.customerForm.get('status').value,this.customerForm.get('address.city').value,this.customerForm.get('address.state').value
        ,this.customerForm.get('address.zip').value,this.customerForm.get('birthdate').value,this.customerForm.get('gender').value,
        null,null,this.customerForm.get('phone').value,this.customerForm.get('passwordGroup.password').value,this.customerForm.get('passwordGroup.password').value,null)
        this.Accounts.push(user);
        this._AccountService.addUser(user);
        this.customerForm.reset();
        console.log('Saved: ' + JSON.stringify(user));
    }
SetAccountInForm(user:User){
    this.account=user;
}
update(){
        let user =new User(this.customerForm.get('userName').value,this.customerForm.get('firstName').value,this.customerForm.get('lastName').value,this.customerForm.get('emailGroup.email').value
        ,this.customerForm.get('status').value,this.customerForm.get('address.city').value,this.customerForm.get('address.state').value
        ,this.customerForm.get('address.zip').value,this.customerForm.get('birthdate').value,this.customerForm.get('gender').value,
        null,null,this.customerForm.get('phone').value,this.customerForm.get('passwordGroup.password').value,this.customerForm.get('passwordGroup.password').value,null)
        this._AccountService.update(user);
}

delete(user:any){
    console.log(JSON.stringify(user));
    let userName:string=user.userName;
    this._AccountService.deleteUser(userName).then(() => {
        this.Accounts = this.Accounts.filter(u => u !== user);
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

