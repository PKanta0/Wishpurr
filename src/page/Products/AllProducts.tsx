import { Link } from "react-router-dom";
import product from "../../img/BackgroundHome.png"; 

type Product = {
    id: number;
    name: string;
    price: number;
    tag: string;
};

const mockProducts: Product[] = [
    { id: 1, name: "Wish Purr Kitten – Turkey & Tuna", price: 299, tag: "kitten" },
    { id: 2, name: "Wish Purr Adult – Chicken & Salmon", price: 329, tag: "adult" },
    { id: 3, name: "Wish Purr Indoor Cat", price: 319, tag: "adult" },
    { id: 4, name: "Wish Purr Sensitive", price: 349, tag: "special" },
];

export default function AllProducts() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            {/* หัวข้อ + filter แบบง่าย ๆ */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">สินค้า Wish Purr</h1>
                    <p className="text-sm text-gray-600">
                        เลือกสูตรที่เหมาะกับลูกแมวและแมวโตของคุณ
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    <button className="rounded-full border border-gray-800 px-4 py-1">
                        ทั้งหมด
                    </button>
                    <button className="rounded-full border border-gray-300 px-4 py-1">
                        สำหรับลูกแมว
                    </button>
                    <button className="rounded-full border border-gray-300 px-4 py-1">
                        สำหรับแมวโต
                    </button>
                    <button className="rounded-full border border-gray-300 px-4 py-1">
                        สูตรพิเศษ
                    </button>
                </div>
            </section>

            {/* Grid การ์ดสินค้า */}
            <section className="grid gap-6 md:grid-cols-3">
                {mockProducts.map((p) => (
                    <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        {/* รูปสินค้า */}
                        <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-[#f4f2ec]">
                            <img
                                src={product}
                                alt={p.name}
                                className="h-full w-auto rounded-[24px] object-contain"
                            />
                        </div>

                        {/* ข้อมูลสินค้า */}
                        <div className="mt-4 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                {p.tag === "kitten"
                                    ? "สำหรับลูกแมว"
                                    : p.tag === "adult"
                                        ? "สำหรับแมวโต"
                                        : "สูตรพิเศษ"}
                            </p>
                            <h2 className="text-sm font-semibold line-clamp-2">{p.name}</h2>
                            <p className="text-sm font-semibold text-[#5b6b32]">
                                {p.price.toLocaleString()} THB
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}






