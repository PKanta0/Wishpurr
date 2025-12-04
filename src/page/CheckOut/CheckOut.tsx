import InfoCheck from "./ComponantCheckOut/InfoCheck"

type CartItem = {
    id: number;
    name: string;
    qty: number;
    price: number;
};

const mockCart: CartItem[] = [
    { id: 1, name: "Wish Purr Kitten – Turkey & Tuna", qty: 1, price: 299 },
    { id: 2, name: "Wish Purr Adult – Chicken & Salmon", qty: 2, price: 329 },
];

const CheckOut = () => {
    const subtotal = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = 40;
    const total = subtotal + shipping;

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

            <div className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
                {/* ฟอร์มที่อยู่/ข้อมูลลูกค้า */}
                <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">ข้อมูลจัดส่ง</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <InfoCheck label="ชื่อ" placeholder="Name"/>
                        <InfoCheck label="นามสกุล" placeholder="Surname" />
                    </div>
                        <InfoCheck label="เบอร์โทร" placeholder="0X-XXX-XXXX" />
                        <InfoCheck label="ที่อยู่จัดส่ง" placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์" />
                        <InfoCheck label="หมายเหตุเพิ่มเติม (ถ้ามี)" placeholder="เช่น ฝากของไว้ที่ รปภ." />

                </section>

                {/* สรุปรายการ + ยอดรวม */}
                <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">สรุปรายการ</h2>

                    <div className="space-y-3 text-sm">
                        {mockCart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-600">x{item.qty}</p>
                                </div>
                                <p className="font-medium">
                                    {(item.price * item.qty).toLocaleString()} THB
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-2" />

                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>ยอดรวมสินค้า</span>
                            <span>{subtotal.toLocaleString()} THB</span>
                        </div>
                        <div className="flex justify-between">
                            <span>ค่าจัดส่ง</span>
                            <span>{shipping.toLocaleString()} THB</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>ยอดชำระทั้งหมด</span>
                            <span>{total.toLocaleString()} THB</span>
                        </div>
                    </div>

                    <button className="mt-4 w-full rounded-full bg-black py-3 text-sm font-medium text-white hover:opacity-80">
                        ยืนยันคำสั่งซื้อ
                    </button>
                </section>
            </div>
        </div>
    );
};

export default CheckOut;
