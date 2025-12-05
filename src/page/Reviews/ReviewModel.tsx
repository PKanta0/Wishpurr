import { useState } from "react";

const API_BASE = "http://localhost:4000";

type ReviewModalProps = {
    productId: number;
    productName: string;
    onClose: () => void;
};

export default function ReviewModal({
    productId,
    productName,
    onClose,
}: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !token) {
            setMessage("กรุณาเข้าสู่ระบบก่อนเขียนรีวิว");
            return;
        }

        if (!comment.trim()) {
            setMessage("กรุณาเขียนความรู้สึกเล็กน้อยก่อนส่งรีวิว");
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            const res = await fetch(`${API_BASE}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    rating,
                    comment,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "ส่งรีวิวไม่สำเร็จ");
            }

            setMessage("ส่งรีวิวเรียบร้อยแล้ว ขอบคุณมากค่ะ 🐾");
            setComment("");
        } catch (err: any) {
            setMessage(err.message || "ส่งรีวิวไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">รีวิวสินค้าของคุณ</h2>
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                <p className="mb-3 text-sm text-gray-700">
                    รู้สึกอย่างไรกับ <span className="font-medium">{productName}</span> ?
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <span>ให้คะแนน:</span>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="rounded-full border px-3 py-1"
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {r} ดาว
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <textarea
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full rounded-2xl border px-3 py-2 text-sm"
                            placeholder="เล่าให้เราฟังหน่อยว่าน้องแมวรู้สึกยังไงกับเมนูนี้บ้าง..."
                        />
                    </div>

                    {message && (
                        <p className="text-xs text-gray-600">{message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 w-full rounded-full bg-black py-2 text-sm text-white disabled:opacity-60"
                    >
                        {loading ? "กำลังส่งรีวิว..." : "ส่งรีวิว"}
                    </button>

                   
                </form>
            </div>
        </div>
    );
}