import {PhotoDto} from './PhotoDto';

export interface MemberDTO{
    id: number;
    userName: string;
    email: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: number;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: PhotoDto[];
}