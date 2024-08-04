/// <reference types="vite/client" />
declare module "@acc/api" {
    export interface Profile {
        avatar: string;
        email: string;
        id: number;
        first_name: string;
        last_name: string;
    }
    export const getAllUsers: () => Promise<{
        data: Profile[];
    }>;
}
