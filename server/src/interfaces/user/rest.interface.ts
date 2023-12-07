//Hereglegch uusgeh bolon avah huselt
export interface RestCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  grade: number | null;
  role: 'Student';
}
export interface RestGetUser {
  email: string;
  password: string;
}
