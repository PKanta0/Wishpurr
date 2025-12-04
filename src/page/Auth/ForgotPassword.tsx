const ForgotPassword = () => {
    return (
        <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
            <h1 className="text-2xl font-semibold text-center">Forgot Password</h1>

            <form className="space-y-4 rounded-3xl bg-white p-6 shadow-sm text-sm">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-700">Email</label>
                    <input
                        type="email"
                        className="rounded-full border px-3 py-2 outline-none focus:border-black"
                        placeholder="you@example.com"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-black py-2.5 text-white"
                >
                    ส่งลิงก์รีเซ็ตรหัสผ่าน
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
