export type ProductType = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    image_cover: string;
    category_name?: string;
};

export type CartItem = {
    product_id: number;
    name: string;
    price: number;
    image_cover: string;
    qty: number;
};

export type Product = {
    product_id: number;
    name: string;
    price: number;
    image_cover: string;
    category_name?: string;
};

export type OrderItemPayload = {
    productId: number;
    qty: number;
    unitPrice: number;
};

export type infoCheckOut = {
    label: string;
    placeholder: string;
};

export type ReviewModelProps = {
    productId: number;
    productName: string;
    onClose: () => void;
};

export type ReviewSubmitResult = {
    success: boolean;
    message: string;
};

export type AdminProduct = {
    product_id: number;
    name: string;
    price: number;
    image_cover: string | null;
    category_name?: string;
};

export type FormState = {
    name: string;
    price: string;
    image_cover: string;
    category_name: string;
};

export type AdminReview = {
    review_id: number;
    user_name: string;
    product_name: string;
    rating: number;
    comment: string;
    created_at: string;
};

export type OrderItem = {
    order_item_id: number;
    product_id: number;
    name: string;
    qty: number;
    unit_price: number;
};

export type Order = {
    order_id: number;
    user_id: number;
    user_name: string;
    email: string;
    total: number;
    created_at: string;
    items: OrderItem[];
};

export type Tab = "orders" | "products" | "reviews";

export type FilterType = "all" | "kitten" | "adult" | "special";