export class Restaurant {
    restaurantId?: number;
    name: string;
    description: string;
    address: string;
    postCode: string;
    city: string;
    phone: string;
    website?: string;
    isReserved?: boolean;
    userId?: number;

    constructor(restaurantId: number, name: string, description: string, address: string, postCode: string, city: string, phone: string, website: string, isReserved: boolean, userId: number) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.postCode = postCode;
        this.city = city;
        this.phone = phone;
        this.website = website;
        this.isReserved = isReserved;
        this.userId = userId;

    }

}