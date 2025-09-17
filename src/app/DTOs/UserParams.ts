export class UserParams{
    pageNumber : number = 1;
    pageSize : number = 3;
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