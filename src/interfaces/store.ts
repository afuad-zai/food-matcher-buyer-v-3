export interface StoreInfo {
    id: string;
    closeTime: string;
    imageUrl: string;
    name: string;
    openTime: string;
    location: {
        lat: number;
        lon: number;
    };
    categories: string[]
}
