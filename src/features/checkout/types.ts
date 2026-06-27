export interface CartItem {
    productId: string;
    productName: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
}

export interface AddressDto {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface OrderItemRequest {
    productId: string;
    quantity: number;
}

export interface CreateOrderRequest {
    items: OrderItemRequest[];
    shippingAddress: AddressDto;
    billingAddress: AddressDto;
    notes?: string;
}

export interface OrderResponse {
    id?: string;
    orderId?: string;
    total?: number;
    createdAt?: string;
}
