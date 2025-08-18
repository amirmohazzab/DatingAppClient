export class UserParams{
    pageNumber : number = 2;
    pageSize : number = 1;
    minAge : number = 18;
    maxAge : number = 85;
    gender : Gender = Gender.male
    orderBy : OrderBy = OrderBy.lastActive;
    typeSort : TypeSort = TypeSort.desc
}

export enum Gender{
    male, 
    female
}

export enum OrderBy{
    lastActive,
    created,
    age
}

export enum TypeSort{
    asc,
    desc
}