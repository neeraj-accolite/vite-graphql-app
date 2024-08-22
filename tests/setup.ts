import { beforeEach, vi } from 'vitest'
import { cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import OrdersData from './__mocks__/ordersData.json';

configure({ testIdAttribute: 'id' })

// runs a clean after each test case (e.g. clearing jsdom)
beforeEach(() => {
    cleanup();
})

vi.mock("@acc/api", () => {
    return {
        getOrderDetails: (id: number) => new Promise((resolve, reject) => {
            resolve(OrdersData);
        })
    }
});