export class Restaurants {
    restaurantId: number;
    name: string;
    description: string;
    adress: string;
    postCode: string;
    city: string;
    phone: string;
    website: string;
    isReserved: boolean;
    userId: number;

    constructor(restaurantId: number, name: string, description: string, adress: string, postCode: string, city: string, phone: string, website: string, isReserved: boolean, userId: number) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.description = description;
        this.adress = adress;
        this.postCode = postCode;
        this.city = city;
        this.phone = phone;
        this.website = website;
        this.isReserved = isReserved;
        this.userId = userId;

    }

}