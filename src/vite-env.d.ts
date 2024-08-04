/// <reference types="vite/client" />
declare module "@types" {
    export interface CartItemData {
        id: number;
        name: string;
        description: string;
        images: string[];
        lineTotal: {
            amount: number;
        };
        quantity: number;
        unitTotal: {
            amount: number;
        }
    }
}
