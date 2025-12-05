import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminReviews from "./AdminReviews";
import { API_BASE } from "../../config/api";
import { getToken } from "../../utils/auth";
import { Order, Tab } from "../../utils/Types"



export default function AdminPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("orders");

    useEffect(() => {
        // เช็คสิทธิ์ admin ฝั่ง frontend เบื้องต้น
        const storedUser = localStorage.getItem("user");
        const token = getToken();

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
                setOrderError(null);
            } catch (e: any) {
                setOrderError(e.message);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const tabBase =
        "rounded-full px-4 py-1 text-xs md:text-sm border transition";
    const tabActive = tabBase + " bg-black text-white border-black";
    const tabInactive =
        tabBase + " border-gray-300 text-gray-700 hover:border-gray-600";

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
            <h1 className="mb-4 text-2xl font-semibold">Admin Dashboard</h1>

            {/* แท็บเมนู */}
            <div className="mb-4 flex flex-wrap gap-3 text-sm">
                <button
                    className={activeTab === "orders" ? tabActive : tabInactive}
                    onClick={() => setActiveTab("orders")}
                >
                    ภาพรวมคำสั่งซื้อ
                </button>
                <button
                    className={activeTab === "products" ? tabActive : tabInactive}
                    onClick={() => setActiveTab("products")}
                >
                    จัดการสินค้า
                </button>
                <button
                    className={activeTab === "reviews" ? tabActive : tabInactive}
                    onClick={() => setActiveTab("reviews")}
                >
                    จัดการรีวิว
                </button>
            </div>

            {/* แท็บ 1: คำสั่งซื้อ */}
            {activeTab === "orders" && (
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">รายการคำสั่งซื้อทั้งหมด</h2>

                    {loadingOrders ? (
                        <p className="text-sm text-gray-600">Loading admin data...</p>
                    ) : orderError ? (
                        <p className="text-sm text-red-500">{orderError}</p>
                    ) : orders.length === 0 ? (
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

                                    <div className="mt-3 space-y-1 border-t pt-2 text-xs text-gray-700">
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
            )}

            {/* แท็บ 2: จัดการสินค้า */}
            {activeTab === "products" && <AdminProducts />}

            {/* แท็บ 3: จัดการรีวิว */}
            {activeTab === "reviews" && <AdminReviews />}
        </div>
    );
}
