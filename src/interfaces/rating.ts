export interface BriefRating {
    averageRate: number;
    reviewCount: number;
}

export interface DetailRating {
    comment: string;
    date: string;
    rate: number;
    raterName: string;
    raterImage: string;
}

export interface PostRating {
    comment: string;
    date: string;
    rate: number;
    ratedBy: string;
    target: string;
    orderId: string;
}