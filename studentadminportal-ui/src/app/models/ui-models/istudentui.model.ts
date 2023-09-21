import { IAddressUI } from "./iaddressui.model";
import { IGenderUI } from "./igenderui.model";

export interface IStudentUI {
  id:string;
  firstName:string;
  lastName:string;
  dateOfBirth:string;
  email:string;
  mobile:string;
  profileImageUrl:string;
  genderId:string;
  gender:IGenderUI;
  address:IAddressUI
}
