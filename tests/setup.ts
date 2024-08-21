import { beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
// import apiModule from "@acc/api";

// runs a clean after each test case (e.g. clearing jsdom)
beforeEach(() => {
    cleanup();
})