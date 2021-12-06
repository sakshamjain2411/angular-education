export class StudentRegistrationModel {
    id: number = 0;
    studentName!: string;
    email!: string;
    phone!: string;
    country!: string;
    pincode!: string;
    state!: string;
    city!: string;
    studentType!: string;
    referralCode!: string;
    schoolStudent!: object;
    other!: object;
    totalAmount!: number;
}