export interface UserDto{
    userName: string;
    token: string;
    photoUrl: string;
    gender: number;
    knownAs: string;
    roles?: string[];
}