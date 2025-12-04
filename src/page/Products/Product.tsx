import { useParams } from "react-router-dom";
import productImg from "../../img/BackgroundHome.png";

export default function Product() {
    const { id } = useParams();

    // mock
    const product = {
        id,
        name: "Wish Purr – Turkey & Tuna",
        description:
            "อาหารแมวสูตรปลาทูน่าและไก่งวง สำหรับลูกแมวและแมวโต ให้โปรตีนสูง ย่อยง่าย และมีส่วนผสมจากธรรมชาติ",
        price: 299,
        weight: "1.2 KG",
        tag: "สำหรับลูกแมว",
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-10 md:grid-cols-2">

                {/* รูปสินค้า */}
                <div className="flex items-center justify-center bg-[#f4f2ec] rounded-3xl p-6">
                    <img
                        src={productImg}
                        alt={product.name}
                        className="w-full h-auto object-contain rounded-2xl"
                    />
                </div>

                {/* ข้อมูลสินค้า */}
                <div className="flex flex-col justify-between space-y-6">

                    <div>
                        <p className="text-sm text-gray-500">{product.tag}</p>
                        <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mt-4 text-lg font-semibold text-[#5b6b32]">
                            {product.price} THB
                        </div>

                        <div className="mt-1 text-sm text-gray-500">
                            น้ำหนักสุทธิ: {product.weight}
                        </div>
                    </div>

                    {/* ปุ่ม */}
                    <div className="flex flex-col gap-3">
                        <button className="w-full rounded-full bg-black py-3 text-white text-sm hover:opacity-80">
                            เพิ่มลงตะกร้า
                        </button>
                        <button className="w-full rounded-full border border-black py-3 text-sm hover:bg-gray-200">
                            ซื้อทันที
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
