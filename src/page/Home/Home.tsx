import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BG from "./ComponantsHome/BG";
import CategoryCard from "./ComponantsHome/CategoryCard";
import ProductStrip from "./ComponantsHome/ProductStrip";
import ReviewCardProps from "../Reviews/ReviewCard";
import SectionPill from "./ComponantsHome/SectionPill";
import { API_BASE } from "../../config/api";
import logo from "../../img/Logo.png";

import product1 from "../../img/product1.png";
import product2 from "../../img/product2.png";
import product3 from "../../img/product3.png";
import product4 from "../../img/product4.png";

type ReviewItem = {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
};

export default function Home() {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);

    // ดึงรีวิวาก backend 
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
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12 space-y-16 md:space-y-20">
            {/* Hero background */}
            <section className="rounded-3xl overflow-hidden shadow-sm">
                <BG />
            </section>

            {/* Hero Section */}
            <section className="grid gap-8 md:grid-cols-[1.2fr,0.8fr] md:items-center">
                <div className="space-y-4 text-gray-700">
                    <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-500">
                        Premium Cat Food
                    </p>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                        “Wellness for Whiskers” — สุขภาพดีเริ่มจากคำปรารถนาดี
                    </h1>

                    <p className="text-sm md:text-base leading-relaxed">
                        WishPurr คือแบรนด์อาหารแมวที่เกิดจาก “ความปรารถนา (Wish)”
                        ให้แมวทุกตัวมีชีวิตที่แข็งแรงและมีความสุข
                        “Purr” คือเสียงแห่งความสุขของแมวที่ตอบแทนความรักของเจ้าของ
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                            to="/products"
                            className="px-6 py-2.5 rounded-full bg-[#f3a86b] text-white text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-[1px] transition"
                        >
                            Shop now
                        </Link>
                        <Link
                            to="/reviews"
                            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-white/70 transition"
                        >
                            ดูรีวิวลูกค้า
                        </Link>
                    </div>
                </div>

                {/*โลโก้ / visual เสริม*/}
                <div className="flex justify-center">
                    <div className="w-48 h-48 md:w-56 md:h-56 bg-[#f5f3e7] rounded-full flex items-center justify-center shadow-sm">
                        <img
                            src={logo}
                            alt="WishPurr Logo"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Category: สำหรับลูกแมว / สำหรับแมวโต */}
            <section className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                    เลือกสูตรให้เหมาะกับน้องเหมียวของคุณ
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                    <CategoryCard label="สำหรับลูกแมว" to="/products" />
                    <CategoryCard label="สำหรับแมวโต" to="/products" />
                </div>
            </section>

            {/* แถบสินค้า 4 รูป */}
            <section className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                    <ProductStrip src={product1} linkTo="/products" />
                    <ProductStrip src={product2} linkTo="/products" />
                    <ProductStrip src={product3} linkTo="/products" />
                    <ProductStrip src={product4} linkTo="/products" />
                </div>
            </section>

            {/* Experience */}
            <section className="grid gap-8" id="experience">
                <SectionPill>
                    <Link to="/reviews">
                        <p>Experience</p>
                    </Link>
                </SectionPill>

                <div className="grid gap-6 md:grid-cols-4">
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
            <section className="grid gap-8 pb-4">
                <SectionPill>
                    <p>Coming Soon</p>
                </SectionPill>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                    <ProductStrip src={product1} linkTo="/products" />
                    <ProductStrip src={product2} linkTo="/products" />
                    <ProductStrip src={product3} linkTo="/products" />
                    <ProductStrip src={product4} linkTo="/products" />
                </div>
            </section>
        </main>
    );
}
