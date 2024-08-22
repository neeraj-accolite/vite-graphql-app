import { useEffect, useState } from "react";
import { RxDatabase } from "rxdb";
import { ShoppingAppDbCollections } from "./db";
import { DatabaseContext } from "./DatabaseContext";
import { createDatabaseClient } from ".";


export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [database, setDatabase] = useState<RxDatabase<ShoppingAppDbCollections> | null>(null);

    useEffect(() => {
        async function initiateDatabaseClient() {
            const db = await createDatabaseClient();
            setDatabase(db);
        }
        initiateDatabaseClient();
    }, []);

    if (!database) {
        //Database is not yet initialized. 
        return null;
    }

    return (
        <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>
    )

}