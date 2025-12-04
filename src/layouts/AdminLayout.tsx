import { Outlet, NavLink, Link } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Sidebar Admin */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="px-4 py-4 border-b">
                    <Link to="/" className="font-bold text-lg">
                        Wish Purr Admin
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                        แดชบอร์ดจัดการร้านอาหารแมว
                    </p>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1 text-sm">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg ${isActive ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-slate-100"
                            }`
                        }
                    >
                        ภาพรวม (Dashboard)
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg ${isActive ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-slate-100"
                            }`
                        }
                    >
                        จัดการสินค้า
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg ${isActive ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-slate-100"
                            }`
                        }
                    >
                        คำสั่งซื้อ
                    </NavLink>

                    <NavLink
                        to="/admin/reviews"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg ${isActive ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-slate-100"
                            }`
                        }
                    >
                        รีวิวสินค้า
                    </NavLink>
                </nav>

                <div className="px-4 py-3 border-t text-xs text-gray-500">
                    <button className="hover:underline">ออกจากระบบ</button>
                </div>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
