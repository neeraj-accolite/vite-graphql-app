import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CartPage from '../../src/pages/Cart';
import React from "react";
import { MockedProvider, wait } from '@apollo/client/testing';
import { DatabaseProvider } from '../../src/db/DatabaseProvider';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { cartGQLMock, cartMockResponse } from '../__mocks__/cartData';
import OrderData from '../__mocks__/ordersData.json';

describe("Cart Page", () => {

    const CartPageComponent = () => (
        <MockedProvider mocks={[cartGQLMock]} addTypename={false}>
            <DatabaseProvider>
                <MemoryRouter initialEntries={['/cart/421989001']}>
                    <Routes>
                        <Route path="/cart/:cartId" Component={CartPage} />
                    </Routes>
                </MemoryRouter>
            </DatabaseProvider>
        </MockedProvider>
    )

    test("Cart Page is rendered successfully with Cart Mock Data", async () => {
        const component = render(
            <CartPageComponent />
        )
        //The loading should be enabled first.
        let loadingElem = await component.findByTestId('loader');
        expect(loadingElem).toBeTruthy();

        //The cart items should be loaded when the data is fetched over the network.
        const cartItemElem = await waitFor(() => component.findByText(cartMockResponse.cart.items[1].name));
        expect(cartItemElem).toBeTruthy();

        //The loading should be disabled when the cart products are loaded.
        let elem = component.queryByTestId('loader');
        expect(elem).not.toBeTruthy();
        expect(component).toMatchSnapshot();
    });

    test("Add More Item Page is opened when ⨁ Add Item To Cart Button is Pressed", async () => {
        const component = render(
            <CartPageComponent />
        )

        //The cart items should be loaded when the data is fetched over the network.
        const cartItemElem = await waitFor(() => component.findByText(cartMockResponse.cart.items[1].name));
        expect(cartItemElem).toBeTruthy();

        //The cart items should be loaded when the data is fetched over the network.
        const addItemBtn = await component.findByText("⨁ Add more item to the cart");
        expect(addItemBtn).toBeTruthy();

        //Fire event to load the Add Item Form.
        fireEvent.click(addItemBtn);

        const addItemCartFormTitleElem = await waitFor(() => component.findByText('Add Item in the Cart'));
        expect(addItemCartFormTitleElem).toBeVisible();

        const productItemElem = await waitFor(() => component.findAllByText(OrderData.products[1].title));
        expect(productItemElem).toBeTruthy();

    });

});