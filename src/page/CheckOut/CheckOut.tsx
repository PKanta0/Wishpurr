import InfoCheck from "./ComponantCheckOut/InfoCheck"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000";

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

const CheckOut = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        setCart(loadCart());
    }, [navigate]);

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleQtyChange = (productId: number, delta: number) => {
        setCart((prev) => {
            const updated = prev
                .map((item) =>
                    item.product_id === productId
                        ? { ...item, qty: Math.max(1, item.qty + delta) }
                        : item
                )
                .filter((item) => item.qty > 0);
            saveCart(updated);
            return updated;
        });
    };

    const handleRemove = (productId: number) => {
        setCart((prev) => {
            const updated = prev.filter((item) => item.product_id !== productId);
            saveCart(updated);
            return updated;
        });
    };

    const handleSubmitOrder = async () => {
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            setError("ตะกร้าว่าง");
            return;
        }

        setLoading(true);
        try {
            const itemsPayload = cart.map((item) => ({
                productId: item.product_id,
                qty: item.qty,
                unitPrice: item.price,
            }));

            const res = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ items: itemsPayload }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "สร้างคำสั่งซื้อไม่สำเร็จ");
            }

            // เคลียร์ตะกร้า
            localStorage.removeItem("cart");
            setCart([]);
            setSuccess("สร้างคำสั่งซื้อเรียบร้อยแล้ว");
        } catch (e: any) {
            setError(e.message || "สร้างคำสั่งซื้อไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    if (!cart.length && !success) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
                <p className="text-sm text-gray-600">ตะกร้าของคุณว่าง</p>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-2 text-xs text-red-600">
                    {error}
                </div>
            )}
            {success && (
                <div className="rounded-xl bg-green-50 px-4 py-2 text-xs text-green-600">
                    {success}
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
                {/* ฟอร์มที่อยู่/ข้อมูลลูกค้า */}
                <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">ข้อมูลจัดส่ง</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoCheck label="ชื่อ" placeholder="Name" />
                        <InfoCheck label="นามสกุล" placeholder="Surname" />
                    </div>
                    <InfoCheck label="เบอร์โทร" placeholder="0X-XXX-XXXX" />
                    <InfoCheck label="ที่อยู่จัดส่ง" placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์" />
                    <InfoCheck label="หมายเหตุเพิ่มเติม (ถ้ามี)" placeholder="เช่น ฝากของไว้ที่ รปภ." />

                </section>

                {/* สรุปรายการ + ยอดรวม */}
                <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">สรุปรายการ</h2>

                    {/* รายการสินค้าในตะกร้า */}
                    <div className="space-y-4 rounded-3xl bg-white p-4 shadow-sm">
                        {cart.map((item) => (
                            <div
                                key={item.product_id}
                                className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                            >
                                <div className="h-16 w-16 overflow-hidden rounded-2xl bg-[#f4f2ec]">
                                    <img
                                        src={item.image_cover}
                                        alt={item.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="flex-1 space-y-1 text-sm">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-500">
                                        {item.price.toLocaleString()} THB / ถุง
                                    </p>

                                    <div className="flex items-center gap-3 text-xs">
                                        <span>จำนวน:</span>
                                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
                                            <button
                                                type="button"
                                                onClick={() => handleQtyChange(item.product_id, -1)}
                                                className="px-2"
                                            >
                                                -
                                            </button>
                                            <span className="w-6 text-center">{item.qty}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleQtyChange(item.product_id, 1)}
                                                className="px-2"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(item.product_id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            ลบออกจากตะกร้า
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right text-sm font-semibold">
                                    {(item.price * item.qty).toLocaleString()} THB
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-2" />

                    {/* สรุปยอด + ปุ่มสั่งซื้อ */}
                    <div className="flex flex-col items-end gap-3">
                        <div className="text-sm">
                            รวมทั้งหมด:{" "}
                            <span className="text-lg font-semibold text-[#5b6b32]">
                                {total.toLocaleString()} THB
                            </span>
                        </div>

                        <button
                            type="button"
                            disabled={loading || cart.length === 0}
                            onClick={handleSubmitOrder}
                            className="rounded-full bg-black px-8 py-2 text-sm text-white disabled:opacity-60"
                        >
                            {loading ? "กำลังสร้างคำสั่งซื้อ..." : "ยืนยันคำสั่งซื้อ"}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CheckOut;
