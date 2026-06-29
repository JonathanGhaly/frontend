import type { AddressDto } from "../checkout/types";

/* =========================================================
 * Products
 * =======================================================*/

export interface AdminProduct {
    id: string;
    name: string;
    slug: string;
    description?: string | null;

    price: number;              // stored in cents
    currency: string;

    sku?: string | null;

    stockQuantity: number;

    isActive: boolean;

    metadata: Record<string, unknown>;

    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;

    categoryIds?: string[];
}

export interface ProductWriteRequest {
    id?: string;

    name: string;
    slug: string;

    description?: string;

    price: number;
    currency?: string;

    sku?: string;

    stockQuantity: number;

    isActive: boolean;

    metadata?: Record<string, unknown>;

    categoryIds: string[];
}

/* =========================================================
 * Categories
 * =======================================================*/

export interface AdminCategory {
    id: string;

    name: string;
    slug: string;

    parentId?: string | null;

    createdBy?: string | null;

    sortOrder: number;

    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export interface CategoryWriteRequest {
    id?: string;

    name: string;
    slug: string;

    parentId?: string | null;

    sortOrder: number;
}

/* =========================================================
 * Orders
 * =======================================================*/

export const OrderStatus = {
    Pending: "pending",
    Paid: "paid",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
    Refunded: "refunded",
} as const;

export type OrderStatus =
    (typeof OrderStatus)[keyof typeof OrderStatus];

export interface AdminOrderItem {
    id: string;

    productId: string;
    productName?: string;

    quantity: number;

    unitPrice: number; // cents
    total: number;     // cents
}

export interface AdminOrder {
    id: string;

    userId: string;

    status: OrderStatus;

    subtotal: number;
    tax: number;
    shipping: number;
    total: number;

    currency: string;

    shippingAddress: AddressDto;
    billingAddress: AddressDto;

    notes?: string | null;

    placedAt: string;

    shippedAt?: string | null;
    deliveredAt?: string | null;

    items?: AdminOrderItem[];
}

export const orderStatusLabels: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: "Pending",
    [OrderStatus.Paid]: "Paid",
    [OrderStatus.Shipped]: "Shipped",
    [OrderStatus.Delivered]: "Delivered",
    [OrderStatus.Cancelled]: "Cancelled",
    [OrderStatus.Refunded]: "Refunded",
};
