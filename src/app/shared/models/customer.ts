import { Bank } from './bank';

export class Customer {
  id?: number;
  emailId?: string;
  name?: string;
  fname?: string;
  lname?: string;
  dob?: Date;
  joinDate?: Date;
  sponsorId?: number;
  totSponsor?: number;
  packageAmt?: number;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  phoneNumber?: string;
  errorMessage?: string;
  gender?: string;
  status?: string;
  bank?: Bank;
  notiId?: string;
  joinDateString?: string;
}
