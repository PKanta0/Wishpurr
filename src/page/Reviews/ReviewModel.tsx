import { ReviewModelProps } from "../../utils/Types";
import { useReviewModel } from "./ReviewModelLogic";

export default function ReviewModel({
    productId,
    productName,
    onClose,
}: ReviewModelProps) {

    const {
        rating,
        setRating,
        comment,
        setComment,
        loading,
        successMsg,
        errorMsg,
        submit,
    } = useReviewModel(productId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">รีวิวสินค้าของคุณ</h2>
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>
                </div>

                <p className="mb-3 text-sm text-gray-700">
                    รู้สึกอย่างไรกับ <span className="font-medium">{productName}</span> ?
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <span>ให้คะแนน:</span>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="rounded-full border px-3 py-1"
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {r} ดาว
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <textarea
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full rounded-2xl border px-3 py-2 text-sm"
                            placeholder="เล่าให้เราฟังหน่อยว่าน้องแมวรู้สึกยังไงกับเมนูนี้บ้าง..."
                        />
                    </div>

                    {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
                    {successMsg && <p className="text-xs text-green-600">{successMsg}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 w-full rounded-full bg-black py-2 text-sm text-white disabled:opacity-60"
                    >
                        {loading ? "กำลังส่งรีวิว..." : "ส่งรีวิว"}
                    </button>

                   
                </form>
            </div>
        </div>
    );
}