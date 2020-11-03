import { Bank } from './bank';

export class Staff {
  id?: number;
  emailId?: string;
  name?: string;
  fname?: string;
  lname?: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  phoneNumber?: string;
  errorMessage?: string;
  status?: string;
  bank?: Bank;
  notiId?: string;
  achievementData?: string;
  annoucementData?: string;
}
