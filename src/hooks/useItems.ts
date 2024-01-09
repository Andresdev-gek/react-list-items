import { useState } from "react";
import { Item, ItemId } from "../App";

const INITIAL_ITEMS: Item[] = [
    {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        content: "lavar ropa",
        checked: false,
    },
];

export const useItems = () => {
    const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);


    const addItem = (content: string) => {
        const newItem: Item = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            content,
            checked: false
        };

        setItems((prevItems) => {
            return [...prevItems, newItem];
        });
    }

    const removeItem = (id: ItemId) => {
        setItems((prevItems) => {
            return prevItems.filter((element) => element.id != id);
        });
    }

    const changeCheck = (id: ItemId) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    }

    return {
        items,
        addItem,
        removeItem,
        changeCheck
    }
}