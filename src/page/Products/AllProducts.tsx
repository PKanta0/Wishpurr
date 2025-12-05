import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:4000";

type Product = {
    product_id: number;
    name: string;
    price: number;
    image_cover: string;
    category_name?: string;
};

type FilterType = "all" | "kitten" | "adult" | "special";

export default function AllProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE}/products`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to load products");
                setProducts(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="px-10 py-10">Loading products...</div>;
    }

    if (error) {
        return <div className="px-10 py-10 text-red-500">{error}</div>;
    }

    // เลือกสินค้าตาม filter
    const filteredProducts = products.filter((p) => {
        switch (filter) {
            case "kitten":
                return p.category_name === "ลูกแมว";
            case "adult":
                return p.category_name === "แมวโต";
            case "special":
                return p.category_name !== "ลูกแมว" && p.category_name !== "แมวโต";
            case "all":
            default:
                return true;
        }
    });

    const baseBtn =
        "rounded-full px-4 py-1 text-sm transition border";
    const activeBtn = baseBtn + " border-gray-900 bg-black text-white";
    const inactiveBtn =
        baseBtn + " border-gray-300 text-gray-700 hover:border-gray-600";

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            {/* หัวข้อ + filter */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">สินค้า Wish Purr</h1>
                    <p className="text-sm text-gray-600">
                        เลือกสูตรที่เหมาะกับลูกแมวและแมวโตของคุณ
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    <button
                        className={filter === "all" ? activeBtn : inactiveBtn}
                        onClick={() => setFilter("all")}
                    >
                        ทั้งหมด
                    </button>
                    <button
                        className={filter === "kitten" ? activeBtn : inactiveBtn}
                        onClick={() => setFilter("kitten")}
                    >
                        สำหรับลูกแมว
                    </button>
                    <button
                        className={filter === "adult" ? activeBtn : inactiveBtn}
                        onClick={() => setFilter("adult")}
                    >
                        สำหรับแมวโต
                    </button>
                    <button
                        className={filter === "special" ? activeBtn : inactiveBtn}
                        onClick={() => setFilter("special")}
                    >
                        สูตรพิเศษ
                    </button>
                </div>
            </section>

            {/* Grid การ์ดสินค้า */}
            <section className="grid gap-6 md:grid-cols-3">
                {filteredProducts.map((p) => (
                    <Link
                        key={p.product_id}
                        to={`/product/${p.product_id}`}
                        className="rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        {/* รูปสินค้า */}
                        <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-[#f4f2ec]">
                            <img
                                src={p.image_cover}
                                alt={p.name}
                                className="h-full w-auto rounded-[24px] object-contain"
                            />
                        </div>

                        {/* ข้อมูลสินค้า */}
                        <div className="mt-4 space-y-1">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                {p.category_name === "ลูกแมว"
                                    ? "สำหรับลูกแมว"
                                    : p.category_name === "แมวโต"
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

                {filteredProducts.length === 0 && (
                    <p className="col-span-3 text-center text-sm text-gray-500">
                        ยังไม่มีสินค้าประเภทนี้ในตอนนี้
                    </p>
                )}
            </section>
        </div>
    );
}
