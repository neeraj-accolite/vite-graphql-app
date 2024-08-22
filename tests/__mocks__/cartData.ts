import { vi } from "vitest";
import { GET_CART_DATA } from "../../src/gql/cartGql";

export const cartMockResponse = {
    "cart": {
        "id": "421989001",
        "grandTotal": {
            "amount": 9620,
            "formatted": "Rs. 9620"
        },
        "items": [
            {
                "id": "110",
                "name": "Selfie Lamp with iPhone - Cart Item",
                "images": "https://cdn.dummyjson.com/products/images/mobile-accessories/Selfie%20Lamp%20with%20iPhone/thumbnail.png",
                "description": "This is the description for Selfie Lamp with iPhone | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  ",
                "quantity": 5,
                "lineTotal": {
                    "amount": 70,
                    "formatted": "Rs. 14"
                },
                "unitTotal": {
                    "amount": 14,
                    "formatted": "Rs. 14"
                }
            },
            {
                "id": "144",
                "name": "Cricket Helmet - Cart Item",
                "images": "https://cdn.dummyjson.com/products/images/sports-accessories/Cricket%20Helmet/thumbnail.png",
                "description": "This is the description for Cricket Helmet | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  ",
                "quantity": 4,
                "lineTotal": {
                    "amount": 176,
                    "formatted": "Rs. 44"
                },
                "unitTotal": {
                    "amount": 44,
                    "formatted": "Rs. 44"
                }
            },
            {
                "id": "148",
                "name": "Golf Ball - Cart Item",
                "images": "https://cdn.dummyjson.com/products/images/sports-accessories/Golf%20Ball/thumbnail.png",
                "description": "This is the description for Golf Ball | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  ",
                "quantity": 4,
                "lineTotal": {
                    "amount": 36,
                    "formatted": "Rs. 9"
                },
                "unitTotal": {
                    "amount": 9,
                    "formatted": "Rs. 9"
                }
            },
            {
                "id": "124",
                "name": "iPhone X - Cart Item",
                "images": "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png",
                "description": "This is the description for iPhone X | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  ",
                "quantity": 4,
                "lineTotal": {
                    "amount": 3596,
                    "formatted": "Rs. 899"
                },
                "unitTotal": {
                    "amount": 899,
                    "formatted": "Rs. 899"
                }
            },
            {
                "id": "122",
                "name": "iPhone 6 - Cart Item",
                "images": "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/thumbnail.png",
                "description": "This is the description for iPhone 6 | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  ",
                "quantity": 3,
                "lineTotal": {
                    "amount": 897,
                    "formatted": "Rs. 299"
                },
                "unitTotal": {
                    "amount": 299,
                    "formatted": "Rs. 299"
                }
            }
        ]
    }
}

export const cartGQLMock = {
    request: {
        query: GET_CART_DATA
    },
    variableMatcher: vi.fn().mockReturnValue(true),
    result: {
        data: cartMockResponse,
    },
};

