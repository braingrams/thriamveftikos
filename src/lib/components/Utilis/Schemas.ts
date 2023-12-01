export interface IMainForm {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  dob?: string;
  favLecturer?: string;
  favCourse?: string;
  hobbie?: string;
  relationshipStatus?: string;
  crush?: string;
  option?: string;
  quote?: string;
  email?: string;
  image?: string;
  processed?: false;
  instagram?: string;
  shegeExperience?: string;
  merchFee?: number;
  merchPaid?: number;
}

export interface ILoginForm {
  email?: string;
  password?: string;
}
export interface ISizeboxProps {
  sizeValue: string;
  onClick: any;
  text: string;
  disabled?: boolean;
}
