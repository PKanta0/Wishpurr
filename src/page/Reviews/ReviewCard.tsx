type ReviewCardProps = {
    id: number;
    name: string;
    date: string;
    rating: number;
    comment: string;
    logo: string;
};

export default function ReviewCard({
    name,
    date,
    rating,
    comment,
    logo,
}: ReviewCardProps) {
    return (
        <div className="w-full max-w-[400px] rounded-[50px] bg-white shadow-md px-8 py-6 flex flex-col items-center gap-2 text-center">
            <img src={logo} alt="Wish Purr" className="h-10 w-auto object-contain" />

            <div className="text-sm">
                {"💪".repeat(rating)}
            </div>

            <p className="text-sm text-gray-800">
                {comment}
            </p>

            <div className="mt-2 text-xs text-gray-600">
                <p>{name}</p>
                <p>{date}</p>
            </div>
        </div>
    );
}
