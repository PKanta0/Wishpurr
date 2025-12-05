import { useState, useMemo } from "react";
import { API_BASE } from "../../config/api";
import { getToken } from "../../utils/auth";
import { ReviewSubmitResult } from "../../utils/Types";

export function useReviewModel(productId: number) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { user, token } = useMemo(() => {
        const storedUser = localStorage.getItem("user");
        return {
            user: storedUser ? JSON.parse(storedUser) : null,
            token: getToken(),
        };
    }, []);

    const validate = (): boolean => {
        if (!user || !token) {
            setErrorMsg("กรุณาเข้าสู่ระบบก่อนเขียนรีวิว");
            return false;
        }
        if (!comment.trim()) {
            setErrorMsg("กรุณาเขียนความรู้สึกก่อนส่งรีวิว");
            return false;
        }
        return true;
    };

    const submit = async (): Promise<ReviewSubmitResult> => {
        if (!validate()) {
            return { success: false, message: "ข้อมูลไม่ครบ" };
        }

        setLoading(true);
        setSuccessMsg(null);
        setErrorMsg(null);

        try {
            const res = await fetch(`${API_BASE}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    rating,
                    comment,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "ส่งรีวิวไม่สำเร็จ");
            }

            setSuccessMsg("ส่งรีวิวสำเร็จแล้ว ขอบคุณค่ะ 🐾");
            setComment("");

            return { success: true, message: "success" };
        } catch (err: any) {
            setErrorMsg(err.message || "เกิดข้อผิดพลาด");
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        rating,
        setRating,
        comment,
        setComment,
        loading,
        successMsg,
        errorMsg,
        submit,
    };
}
