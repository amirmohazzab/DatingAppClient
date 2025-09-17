export enum PredicateLikeEnum{
    Liked,
    LikeBy
}

export class UserLikeParams{
    pageNumber: number = 1;
    pageSize: number = 5;
    predicateUserLike: PredicateLikeEnum = PredicateLikeEnum.Liked;
}