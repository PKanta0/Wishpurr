type SectionPillProps = {
    children: React.ReactNode;
};

export default function SectionPill({ children }: SectionPillProps) {
    return (
        <div className="inline-block rounded-full bg-[#bdc3a4] px-5 py-4 text-3xl font-bold text-white text-center m-auto shadow-md">
            {children}
        </div>
    );
}
