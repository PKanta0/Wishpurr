import BackgroundHome from "../../../img/BackgroundHome.png"

export default function BG() {
    return (
        <div className="w-full">
            <img
                src={BackgroundHome}
                alt="Wish Purr Hero"
                className="h-[320px] w-full object-cover md:h-[400px]"
            />
        </div>
    );
}