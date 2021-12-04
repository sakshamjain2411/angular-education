export class InstituteExamRegistrationModel {
    id: number = 0;
    instituteId!: number;
    instituteEmail!: string;
    orderId!: string;
    paymentMode!: string;
    paymentStatus!: string;
    registrationDate!: string;
    studentType!: string
    amount!: number;
    file!: any;
}