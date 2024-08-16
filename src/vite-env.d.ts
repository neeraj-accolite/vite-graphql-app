/// <reference types="vite/client" />
declare module "@types" {
    export interface CartItemData {
        id: number;
        name: string;
        description: string;
        images: string;
        lineTotal: {
            amount: number;
        };
        quantity: number;
        unitTotal: {
            amount: number;
        }
    }

    export interface ItemAddedToCartResponse {
        id: string;
        name: string;
        description: string;
        images: string;
        lineTotal: {
            amount: number;
            formatted: string;
        };
        quantity: number;
        unitTotal: {
            amount: number;
            formatted: string;
        },
        grandTotal: {
            amount: number;
            formatted: string;
        },
        cartId: string;
    }
}

declare module "@acc/api" {
    export interface Order {
        id: number;
        title: string;
        price: number;
        quantity: number;
        thumbnail: string;
    }

    export interface OrderDetail {
        total: number;
        products: Order[];
        totalProducts: number;
        totalQuantity: number;
    }
    const getOrderDetails: (id: number) => Promise<OrderDetail>;
}