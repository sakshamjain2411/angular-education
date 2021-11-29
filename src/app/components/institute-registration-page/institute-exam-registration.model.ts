export class InstituteExamRegistrationModel {
    id: number = 0;
    instituteID!: number;
    orderID!: number;
    paymentMode!: string;
    paymentStatus!: string;
    registrationDate!: Date;
    amount!: number;
}