import { CartItem } from "../../../utils/Types";

export const loadCart = (): CartItem[] => {
    try {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const saveCart = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
};
