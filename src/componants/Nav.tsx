import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/Logo.png"
import { getStoredUser, clearAuth, StoredUser } from "../utils/auth";

type User = {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
};

const Nav = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<StoredUser | null>(() => getStoredUser());

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        clearAuth();
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="w-full border-b border-[#e2dfd5] bg-[#f7f5ef]">
            <div className="mx-auto max-w-7xl px-6 py-3">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Wish Purr Logo"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
                        <Link to="/" className="hover:opacity-70">Home</Link>
                        <Link to="/products" className="hover:opacity-70">Product</Link>
                        <Link to="/reviews" className="hover:opacity-70">Reviews</Link>
                        <Link to="/MyContact" className="hover:opacity-70">Contact us</Link>

                        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

                    </div>

                    {/* Login&shopping */}
                    <div className="flex items-center gap-4 text-sm text-gray-900">
                        {!user && (
                            <Link to="/login" className="hover:opacity-70">
                                Account / Log in
                            </Link>
                        )}

                        {/* ถ้าล็อกอินเป็น User */}
                        {user && user.role === "user" && (
                            <div className="flex items-center gap-3">
                                <span>{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline text-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                        {/* ถ้าล็อกอินเป็น Admin */}
                        {user && user.role === "admin" && (
                            <div className="flex items-center gap-3">
                                <Link to="/admin" className="hover:opacity-70">
                                    Admin
                                </Link>
                                <span>{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline text-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                        <Link to="/checkout">
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-lg hover:bg-gray-800 hover:text-white">
                                🛒
                            </button>
                        </Link>
                        
                    </div>

                </div>

                <div className="md:hidden border-t border-[#e2dfd5] bg-[#f7f5ef]">
                    <div className="flex flex-col gap-2 px-4 py-3 text-sm font-medium text-gray-900">
                        <Link to="/">Home</Link>
                        <Link to="/products">Product</Link>
                        <Link to="/reviews">Reviews</Link>
                        <Link to="/Mycontact">Contact us</Link>
                        <hr className="my-2" />
                    </div>
                </div>


            </div>
        </nav>
    );
};

export default Nav;