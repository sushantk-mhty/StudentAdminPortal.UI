import { IAddress } from "./iaddress.model";
import { IGender } from "./igender.model";

export interface IStudent {
  id:string;
  firstName:string;
  lastName:string;
  dateOfBirth:string;
  email:string;
  mobile:string;
  profileImageUrl:string;
  genderId:string;
  gender:IGender;
  address:IAddress
}
