import { Link } from "react-router-dom";

type ProductStripProps = {
    src: string;
    linkTo: string;
};

export default function ProductStrip({linkTo,src }: ProductStripProps) {

    return (
        <div className="mt-5 w-auto">
            <Link to={linkTo}>
                <img 
                    src={src}
                    className="h-[250px] w-[200px] object-contain rounded-[6vw] shadow-md"
                />
            </Link>
        </div>
        
    );
}
