import logo from "../../img/Logo.png";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import { API_BASE } from "../../config/api";


type Review = {
    review_id: number;
    user_name: string;
    product_name: string;
    rating: number;
    comment: string;
    created_at: string;
};



export default function Review() {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${API_BASE}/reviews/all`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "โหลดรีวิวไม่สำเร็จ");
                }
                setReviews(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="px-4 py-10">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 py-10 text-sm text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-[#f8f4ea] py-16">
            {/* หัวข้อ */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 shadow-sm">
                    <span className="text-sm font-medium text-gray-700">
                        Experience
                    </span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold">
                    เรื่องเล่าจากทาสแมวที่ลอง Wish Purr แล้ว
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    รีวิวจริงจากผู้ใช้งานจริง ทั้งลูกแมวและแมวโต
                </p>
            </div>

            {/* การ์ดรีวิว */}
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
                {reviews.map((r) => (
                    <ReviewCard
                        key={r.review_id} 
                        id={r.review_id}
                        name={`${r.user_name} · ${r.product_name}`}
                        date={new Date(r.created_at).toLocaleDateString("th-TH")}
                        rating={r.rating}
                        comment={r.comment}
                        logo={logo}
                    />
                ))}
            </div>
        </div>
    );
}
