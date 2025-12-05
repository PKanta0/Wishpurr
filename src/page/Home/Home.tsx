import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BG from "./ComponantsHome/BG";
import CategoryCard from "./ComponantsHome/CategoryCard";
import ProductStrip from "./ComponantsHome/ProductStrip";
import ReviewCardProps from "../Reviews/ReviewCard";
import SectionPill from "./ComponantsHome/SectionPill";
import { API_BASE } from "../../config/api";
import logo from "../../img/Logo.png"


type ReviewItem = {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
};

export default function Home() {

    const [reviews, setReviews] = useState<ReviewItem[]>([]);

    // ดึงรีวิวจริงจาก backend มาโชว์บนหน้า Home
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${API_BASE}/reviews/all`);
                const data = await res.json();

                const mapped: ReviewItem[] = data.map((r: any, idx: number) => ({
                    id: r.review_id ?? r.id ?? idx,
                    name:
                        r.user_name && r.product_name
                            ? `${r.user_name} · ${r.product_name}`
                            : r.user_name || "ลูกค้าไม่ระบุชื่อ",
                    date: r.created_at
                        ? new Date(r.created_at).toLocaleDateString("th-TH")
                        : "",
                    rating: r.rating ?? 5,
                    comment: r.comment ?? "",
                }));

                setReviews(mapped);
            } catch (err) {
                console.error("โหลดรีวิวไม่สำเร็จ", err);
            }
        };

        fetchReviews();
    }, []);

    // เอาแค่ 4 รีวิวล่าสุดมาแสดง
    const displayReviews = reviews.slice(0, 4);

    return (
        <div className="mx-auto w-full px-3 py-3 space-y-16">
            <BG />

            {/* Hero Section */}
            <section className="grid gap-8 md:items-center">
                <div className="space-y-4 text-center text-gray-600">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        “Wellness for Whiskers” — สุขภาพดีเริ่มจากคำปรารถนาดี”
                    </h1>
                    <p className="text-sm text-gray-600">
                        WishPurr คือแบรนด์อาหารแมวที่เกิดจาก “ความปรารถนา (Wish)” ให้แมวทุกตัวมีชีวิตที่แข็งแรงและมีความสุข “Purr” เสียงแห่งความสุขของแมวที่ตอบแทนความรักของเจ้าของ
                    </p>
                </div>
            </section>

            {/* Category: สำหรับลูกแมว / สำหรับแมวโต */}
            <section className="grid gap-8 md:grid-cols-2">
                <CategoryCard label="สำหรับลูกแมว" to="/products" />
                <CategoryCard label="สำหรับแมวโต" to="/products" />
            </section>

            {/* แถบสินค้า 4 รูป */}
            <ProductStrip linkTo="/products" />

            {/* Experience */}
            <section className="grid gap-8">
                <SectionPill>
                    <Link to="/reviews">
                        <p>Experience</p>
                    </Link>
                </SectionPill>

                <div className="grid gap-8 md:grid-cols-4">
                    {displayReviews.length > 0 ? (
                        displayReviews.map((r) => (
                            <ReviewCardProps
                                key={r.id}
                                id={r.id}
                                name={r.name}
                                date={r.date}
                                rating={r.rating}
                                comment={r.comment}
                                logo={logo}
                            />
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-sm text-gray-500">
                            ยังไม่มีรีวิว แวะกลับมาดูใหม่เร็ว ๆ นี้นะคะ
                        </p>
                    )}
                </div>
            </section>

            {/* Coming soon */}
            <section className="grid gap-8">
                <SectionPill>
                    <p>Coming Soon</p>
                </SectionPill>

                <ProductStrip />
            </section>
        </div>
    );
}
