type infoCheckOut = {
    label: string;
    placeholder: string;
};

export default function CategoryCard({ label, placeholder }: infoCheckOut) {
    return (

        <div className="flex flex-col text-sm">
            <label className="mb-1 text-gray-700">{label}</label>
            <input
                className="rounded-full border px-3 py-2 text-sm outline-none focus:border-black"
                placeholder={placeholder}
            />
        </div>
    );
}


