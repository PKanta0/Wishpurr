import logo from "../../../img/Logo.png";

type ReviewCardProps = {
    name: string;
    date: string;
    rating: number;
    comment: string;
};

export default function ReviewCard({
    name,
    date,
    rating,
    comment,
}: ReviewCardProps) {
    return (
        <div className="w-full max-w-[400px] rounded-[50px] shadow-md p-6 flex flex-col items-center gap-2 text-center bg-white">
            <img src={logo} alt="logo" className="h-12 w-auto object-contain" />

            <div className="text-md">
                {"💪".repeat(rating)}
            </div>

            <p className="text-sm">{comment}</p>

            <div className="mt-2 text-xs text-gray-600">
                <p>{name}</p>
                <p>{date}</p>
            </div>
        </div>
    );
}
