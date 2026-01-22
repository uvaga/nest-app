import { Photo } from 'src/photos/interfaces/photo';

export interface User {
  id?: number;
  email: string;
  password: string;
  photos: Photo[];
}
