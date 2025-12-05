import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewModal from "../Reviews/ReviewModel";

const API_BASE = "http://localhost:4000";


type Product = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    image_cover: string;
    category_name?: string;
};

type CartItem = {
    product_id: number;
    name: string;
    price: number;
    image_cover: string;
    qty: number;
};

const loadCart = (): CartItem[] => {
    try {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveCart = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
};

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = Number(id);

    const [product, setProduct] = useState<Product | null>(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState(false);
    const [showReview, setShowReview] = useState(false);

    useEffect(() => {
        if (!productId) {
            setError("ไม่พบสินค้า");
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_BASE}/products/${productId}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "โหลดข้อมูลสินค้าไม่สำเร็จ");
                setProduct(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;

        const cart = loadCart();
        const index = cart.findIndex((item) => item.product_id === product.product_id);
        let updated: CartItem[];

        if (index >= 0) {
            updated = [...cart];
            updated[index] = {
                ...updated[index],
                qty: updated[index].qty + qty,
            };
        } else {
            updated = [
                ...cart,
                {
                    product_id: product.product_id,
                    name: product.name,
                    price: product.price,
                    image_cover: product.image_cover,
                    qty,
                },
            ];
        }

        saveCart(updated);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleGoCheckout = () => {
        navigate("/checkout");
    };

    if (loading) {
        return <div className="px-10 py-10">Loading product...</div>;
    }

    if (error || !product) {
        return (
            <div className="px-10 py-10 text-red-500">
                {error || "ไม่พบข้อมูลสินค้า"}
            </div>
        );
    }



    return (
        <div className="mx-auto max-w-5xl px-4 py-10 grid gap-10 md:grid-cols-2">
            {/* รูปสินค้า */}
            <div className="flex items-center justify-center rounded-3xl bg-[#f4f2ec] p-6">
                <img
                    src={product.image_cover}
                    alt={product.name}
                    className="max-h-[360px] w-auto rounded-[24px] object-contain"
                />
            </div>

            {/* ข้อมูลสินค้า */}
            <div className="space-y-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {product.category_name === "ลูกแมว"
                        ? "สำหรับลูกแมว"
                        : product.category_name === "แมวโต"
                            ? "สำหรับแมวโต"
                            : "สูตรพิเศษ"}
                </p>

                <h1 className="text-2xl font-semibold">{product.name}</h1>

                <p className="text-xl font-semibold text-[#5b6b32]">
                    {product.price.toLocaleString()} THB
                </p>

                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                    {product.description}
                </p>

                {/* จำนวน + ปุ่มเพิ่มลงตะกร้า */}
                <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-sm">
                        <span>จำนวน:</span>
                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-white shadow-md">
                            <button
                                type="button"
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="px-2 text-lg shadow-md rounded-full bg-[#fffdf6]"
                            >
                                -
                            </button>
                            <span className="w-6 text-center">{qty}</span>
                            <button
                                type="button"
                                onClick={() => setQty((q) => q + 1)}
                                className="px-2 text-lg shadow-md rounded-full bg-[#fffdf6]"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="rounded-full bg-white shadow-md border border-gray-800 px-6 py-2 text-sm hover:bg-gray-900 hover:text-white"
                        >
                            เพิ่มลงตะกร้า
                        </button>

                        <button
                            type="button"
                            onClick={handleGoCheckout}
                            className="rounded-full bg-white shadow-md border border-gray-800 px-6 py-2 text-sm hover:bg-gray-900 hover:text-white"
                        >
                            ไปหน้าตะกร้า / Checkout
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowReview(true)}
                        className="w-full rounded-full border bg-white shadow-md border-gray-800 px-6 py-2 text-sm hover:bg-gray-900 hover:text-white"
                    >
                        เขียนรีวิวสินค้า
                    </button>

                    {added && (
                        <p className="text-xs text-green-600">
                            เพิ่มสินค้าในตะกร้าแล้ว
                        </p>
                    )}
                    
                </div>
            </div>
            {showReview && (
                <ReviewModal
                    productId={product.product_id}
                    productName={product.name}
                    onClose={() => setShowReview(false)}
                />
            )}
        </div>
    );
}

