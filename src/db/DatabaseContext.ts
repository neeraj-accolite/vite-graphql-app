import { createContext } from "react";
import { RxDatabase } from "rxdb";
import { ShoppingAppDbCollections } from "./db";

export const DatabaseContext = createContext<RxDatabase<ShoppingAppDbCollections> | null>(null);
