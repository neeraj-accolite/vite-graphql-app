import { vi } from 'vitest';

const mockFind = vi.fn(() => ({
    exec: vi.fn(() => Promise.resolve([])),
}));

const mockInsert = vi.fn(() => Promise.resolve());

const mockCollection = {
    find: mockFind,
    insert: mockInsert,
    insert$: vi.fn(() => ({
        subscribe: vi.fn(),
    })),
    findOne: vi.fn(() => ({
        exec: vi.fn(() => Promise.resolve(null)),
    })),
};

const mockDb = {
    collections: {
        myCollection: mockCollection,
    },
};

export const createRxDatabase = vi.fn(() => Promise.resolve(mockDb));