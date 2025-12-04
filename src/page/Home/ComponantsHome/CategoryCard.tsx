import { Link } from "react-router-dom";
import product from "../../../img/product.png";

type CategoryCardProps = {
    label: string;
    to: string;
};

export default function CategoryCard({ label, to }: CategoryCardProps) {
    return (
        <div className="grid justify-center items-center">
            <div className="inline-block rounded-full bg-[#e9ebe0] px-5 py-4 text-md font-bold text-gray-600 text-center m-auto shadow-md">
                <p>{label}</p>
            </div>

            <div className="mt-5 p-3 rounded-3xl bg-[#fefff7] shadow-md transition hover:-translate-y-1">
                <Link to={to}>
                    <img
                        src={product}
                        alt="Wish Purr product"
                        className="h-100 w-auto object-contain rounded-[5vw] shadow-md"
                    />
                    <p className="text-center">shop now</p>
                </Link>
            </div>
        </div>
    );
}
