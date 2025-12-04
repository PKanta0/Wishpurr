import { Link } from "react-router-dom";
import product from "../../../img/product.png";

type ProductStripProps = {
    count?: number;
    linkTo?: string;
};

export default function ProductStrip({ count = 4, linkTo }: ProductStripProps) {
    const Wrapper = linkTo ? Link : "div";

    return (
        <section className="flex gap-4 justify-between mr-10 ml-10 flex-wrap">
            {Array.from({ length: count }).map((_, idx) => (
                <div key={idx} className="mt-5">
                    {linkTo ? (
                        <Link to={linkTo}>
                            <img
                                src={product}
                                alt="Wish Purr product"
                                className="h-70 w-auto object-contain rounded-[6vw] shadow-md"
                            />
                        </Link>
                    ) : (
                        <img
                            src={product}
                            alt="Wish Purr product"
                            className="h-70 w-auto object-contain rounded-[6vw] shadow-md"
                        />
                    )}
                </div>
            ))}
        </section>
    );
}
