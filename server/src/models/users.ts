export class Users {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'customer' | 'restaurant owner';
    address?: string;
    postCode?: string;
    city?: string;
    productId?: number;
    restaurantId?: number;

    constructor(userId: number, firstName: string, lastName: string, email: string, phone: string, password: string, role: 'admin' | 'customer' | 'restaurant owner', address: string, postCode: string, city: string, productId: number, restaurantId: number) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role;
        this.address = address;
        this.postCode = postCode;
        this.city = city;
        this.productId = productId;
        this.restaurantId = restaurantId;
    }
}
