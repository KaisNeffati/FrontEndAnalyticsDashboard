export class User {

public longitude:number;
public latitude:number;
    constructor(
        public userName:string='',
        public firstName = '',
        public lastName = '',
        public email = '',
        public status = '',
        public city?: string,
        public state = '',
        public zip?: string,
        public birthdate?:Date,
        public gender?:string,
        public photo?:any,
        public post?:string,
        public phone?:string,
        public PasswordSalt?:number,
        public Password?:number,
        public AccountCreation?:Date,
        ) { }
}