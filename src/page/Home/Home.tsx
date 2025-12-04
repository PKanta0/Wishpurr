import { Link } from "react-router-dom";
import BG from "./ComponantsHome/BG";
import CategoryCard from "./ComponantsHome/CategoryCard";
import ProductStrip from "./ComponantsHome/ProductStrip";
import ReviewCard from "./ComponantsHome/ReviewCard";
import SectionPill from "./ComponantsHome/SectionPill";

// mock 
const mockReviews = [
    { id: 1, name: "User A", date: "2024-03-01", rating: 5, comment: "Its so Nice!." },
    { id: 2, name: "User B", date: "2024-03-02", rating: 5, comment: "My cat loves it." },
    { id: 3, name: "User C", date: "2024-03-03", rating: 4, comment: "Good quality product." },
    { id: 4, name: "User D", date: "2024-03-04", rating: 5, comment: "Will buy again for sure." },
];

export default function Home() {
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
                <CategoryCard label="สำหรับลูกแมว" to="/product/:id" />
                <CategoryCard label="สำหรับแมวโต" to="/product/:id" />
            </section>

            {/* แถบสินค้า 4 รูป */}
            <ProductStrip linkTo="/product/:id" />

            {/* Experience */}
            <section className="grid gap-8">
                <SectionPill>
                    <Link to="/reviews">
                        <p>Experience</p>
                    </Link>
                </SectionPill>

                <div className="grid gap-8 md:grid-cols-4">
                    {mockReviews.map((r) => (
                        <ReviewCard
                            key={r.id}
                            name={r.name}
                            date={r.date}
                            rating={r.rating}
                            comment={r.comment}
                        />
                    ))}
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
