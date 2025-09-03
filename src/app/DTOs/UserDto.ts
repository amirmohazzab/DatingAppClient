export interface UserDto{
    id: number;
    userName: string;
    token: string;
    photoUrl: string;
    gender: number;
    knownAs: string;
    roles?: string[];
}