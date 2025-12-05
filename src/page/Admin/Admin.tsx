import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000";

type OrderItem = {
    order_item_id: number;
    product_id: number;
    name: string;
    qty: number;
    unit_price: number;
};

type Order = {
    order_id: number;
    user_id: number;
    user_name: string;
    email: string;
    total: number;
    created_at: string;
    items: OrderItem[];
};

export default function AdminPage() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // เช็คสิทธิ์ admin ฝั่ง frontend เบื้องต้น
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            navigate("/login");
            return;
        }

        let user: any;
        try {
            user = JSON.parse(storedUser);
        } catch {
            navigate("/login");
            return;
        }

        if (user.role !== "admin") {
            navigate("/");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE}/orders/admin/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "โหลดข้อมูลออเดอร์ไม่สำเร็จ");
                }
                setOrders(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return <div className="px-10 py-10">Loading admin data...</div>;
    }

    if (error) {
        return (
            <div className="px-10 py-10 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

            <div className="rounded-3xl bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">รายการคำสั่งซื้อทั้งหมด</h2>

                {orders.length === 0 ? (
                    <p className="text-sm text-gray-600">ยังไม่มีคำสั่งซื้อ</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((o) => (
                            <div
                                key={o.order_id}
                                className="rounded-2xl border px-4 py-3 text-sm"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="font-semibold">
                                            Order #{o.order_id} — {o.total.toLocaleString()} THB
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(o.created_at).toLocaleString("th-TH")}
                                        </p>
                                    </div>
                                    <div className="text-right text-xs text-gray-600">
                                        <p>{o.user_name}</p>
                                        <p>{o.email}</p>
                                    </div>
                                </div>

                                <div className="mt-3 border-t pt-2 text-xs text-gray-700 space-y-1">
                                    {o.items.map((it) => (
                                        <div
                                            key={it.order_item_id}
                                            className="flex justify-between"
                                        >
                                            <span>
                                                {it.name} × {it.qty}
                                            </span>
                                            <span>
                                                {(it.qty * it.unit_price).toLocaleString()} THB
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
