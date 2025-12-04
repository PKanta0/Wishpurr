const Footer = () => {
    return (
        <footer className="w-full border-t border-[#e2dfd5] bg-[#f7f5ef]">
            <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-gray-700">
                    <span className="font-semibold">Wish Purr</span> © {new Date().getFullYear()}
                </div>

              
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <span>Wellness for Whiskers</span>
                    <span className="hidden md:inline-block">•</span>
                    <button className="underline-offset-2 hover:underline">
                        Privacy
                    </button>
                    <button className="underline-offset-2 hover:underline">
                        Terms
                    </button>
                    <button className="underline-offset-2 hover:underline">
                        Contact
                    </button>
                </div>

              
                <div className="text-[11px] text-gray-500">
                    Prototype for Wish Purr Cat Food
                </div>
            </div>
        </footer>
    );
};

export default Footer;
