import logo from "../../img/Logo.png";
import ReviewCard from "./ReviewCard";

type Review = {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
};

const mockReviews: Review[] = [
    { id: 1, name: "User A", date: "2024-03-01", rating: 5, comment: "Its so Nice!." },
    { id: 2, name: "User B", date: "2024-03-05", rating: 4, comment: "My cat loves it." },
    { id: 3, name: "User C", date: "2024-03-10", rating: 5, comment: "Good quality and smell." },
    { id: 4, name: "User D", date: "2024-03-12", rating: 5, comment: "Will definitely reorder." },
];

export default function Review() {
    return (
        <div className="w-full bg-[#f7f5ef] px-4 py-10">
            {/* หัว Experience */}
            <div className="flex justify-center mb-8">
                <div className="rounded-full bg-[#dfe5d4] px-8 py-3 shadow-md">
                    <h1 className="text-lg md:text-xl font-semibold text-[#1f2933]">
                        Experience
                    </h1>
                </div>
            </div>

            {/* การ์ดรีวิว */}
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
                {mockReviews.map((r) => (
                    <ReviewCard key={r.id} {...r} logo={logo} />
                ))}
            </div>
        </div>
    );
}
