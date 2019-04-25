export interface Order {
    orderId: string,
    storeId: string,
    storeName: string,
    storeImage: string,
    userId: string,
    status: string,
    timestamp: string,
    storeRating: string,
    userRating: string,
    menus: MenuInfo[]
}

export interface PostOrder {
    storeId: string,
    userId: string,
    timestamp: string,
    status: string,
    storeRating: string,
    userRating: string,
    menus: {}
}

export interface MenuInfo {
    menuId: string,
    imageURL: string,
    name: string,
    price: number,
    quantity: number
}

