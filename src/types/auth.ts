export interface AuthFormData {
    name?:string;
    email:string;
    password :string;
    confirmPassword?:string;
    phone?:string;
    otp?:string;
    address?:{
        street:string;
        city:string;
        state:string;
        zipCode:string;
        country:string;
    };
}

export type AuthTab ='signin' | 'signup';

export interface OTPState {
    requested:boolean;
    verified:boolean;
    phone:string;
    
}