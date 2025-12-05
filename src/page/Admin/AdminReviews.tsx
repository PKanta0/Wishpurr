import { useEffect, useState } from "react";
import { API_BASE } from "../../config/api";
import { getToken } from "../../utils/auth";
import { AdminReview } from "../../utils/Types"


export default function AdminReviews() {
    const [reviews, setReviews] = useState<AdminReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = getToken();

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/reviews/all`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "โหลดรีวิวล้มเหลว");
            setReviews(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "โหลดรีวิวล้มเหลว");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        if (!token) {
            alert("กรุณาเข้าสู่ระบบแอดมินก่อน");
            return;
        }
        if (!confirm("ต้องการลบรีวิวนี้ใช่ไหม?")) return;

        try {
            const res = await fetch(`${API_BASE}/reviews/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "ลบรีวิวไม่สำเร็จ");

            await fetchReviews();
        } catch (err: any) {
            alert(err.message || "ลบรีวิวไม่สำเร็จ");
        }
    };

    if (loading) return <p className="p-4">กำลังโหลดรีวิว...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">จัดการรีวิว</h2>

            <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm text-sm">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b text-xs text-gray-500">
                            <th className="py-2">สินค้า</th>
                            <th className="py-2">ผู้ใช้</th>
                            <th className="py-2">ให้คะแนน</th>
                            <th className="py-2">รีวิว</th>
                            <th className="py-2">วันที่</th>
                            <th className="py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r) => (
                            <tr key={r.review_id} className="border-b last:border-0">
                                <td className="py-2 pr-3">{r.product_name}</td>
                                <td className="py-2 pr-3">{r.user_name}</td>
                                <td className="py-2 pr-3">{r.rating} ⭐</td>
                                <td className="py-2 pr-3 max-w-xs">
                                    <span className="line-clamp-2">{r.comment}</span>
                                </td>
                                <td className="py-2 pr-3">
                                    {new Date(r.created_at).toLocaleDateString("th-TH")}
                                </td>
                                <td className="py-2">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(r.review_id)}
                                        className="text-xs text-red-600 hover:underline"
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-4 text-center text-gray-500">
                                    ยังไม่มีรีวิวในระบบ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
