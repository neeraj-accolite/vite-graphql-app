import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CartItemComponent from '../../src/components/CartItem';
import { CartItem } from "../../src/db/db";
import React from "react";

describe("CartItem Row Component", () => {

    const cartItemData: CartItem = {
        id: "1",
        description: "Product Description",
        images: "http://mock.images.com",
        lineTotal: {
            amount: 100,
            formatted: "Rs 100"
        },
        name: "Product Name",
        quantity: 5,
        unitTotal: {
            amount: 20,
            formatted: 'Rs 20'
        }

    }

    test("CartItem is rendered successfully with product data", () => {
        const component = render(<CartItemComponent item={cartItemData} />);
        expect(component).toMatchSnapshot();
    });

});