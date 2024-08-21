import { configure, fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AddProductForm from '../../src/pages/AddProductForm';
import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import { DatabaseProvider } from '../../src/db/DatabaseProvider';
import OrdersData from '../__mocks__/ordersData.json';

describe("AddProductForm Page", () => {

    configure({ testIdAttribute: 'id' })
    vi.mock("@acc/api", () => {
        return {
            getOrderDetails: (id: number) => new Promise((resolve, reject) => {
                resolve(OrdersData);
            })
        }
    });

    const AddProductFormComponent = () => (
        <MockedProvider addTypename={false}>
            <DatabaseProvider>
                <AddProductForm />
            </DatabaseProvider>
        </MockedProvider>
    )

    test("Add Product Form is rendered successfully with products list loaded in the form", async () => {
        const component = render(
            <AddProductFormComponent />
        )
        const elem = await waitFor(() => component.findByText(OrdersData.products[0].title));
        expect(elem).to.not.null;
        expect(component).toMatchSnapshot();
    });

    test("The Page is displaying loading till the Data is fetched", async () => {

        const component = render(
            <AddProductFormComponent />
        )
        //The loading should be enabled first.
        let loadingElem = await component.findByTestId('loader');
        expect(loadingElem).toBeTruthy();

        //once the mock data is loaded, the Product data should be available in DOM.
        const productElem = await waitFor(() => component.findByText(OrdersData.products[0].title));
        expect(productElem).toBeTruthy();
        //The loading should be disabled as well.
        let elem = component.queryByTestId('loader');
        expect(elem).not.toBeTruthy();

    });

    test("On Add Item to the Cart, the window location is set to # to disappear the form", async () => {
        vi.spyOn(require("@apollo/client"), "useMutation")
            .mockReturnValue([
                vi.fn(),
                {
                    loading: false,
                    error: null,
                    data: {
                        "message": "Item added to the cart successfully",
                        grandTotal: {
                            amount: 100,
                            formmated: "Rs. 100"
                        }
                    }
                }
            ])
        const component = render(
            <AddProductFormComponent />
        )
        const addItemBtn = (await component.findAllByText("⨁ Add Item"))[0];
        expect(addItemBtn).toBeTruthy();
        fireEvent.click(addItemBtn, OrdersData.products[0]);
        expect(window.location.href).toContain("#");
    })

});