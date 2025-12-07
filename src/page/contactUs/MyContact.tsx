import logo from "../../img/Logo.png"

export default function MyContact() {
    return (
        <section className="grid gap-6 items-center text-center">
            <div className="rounded-3xl w-auto bg-white p-4">
                <img
                    src={logo}
                    alt="Wish Purr Logo"
                    className="h-16 w-auto object-contain mx-auto"
                />
                <p>✉️ wishpurr@gmail.com</p>
                <p>📍 Address: 123 WishPurr Street, Bangkok 10110, Thailand</p>
                <p>📞 +66 82 123 4567</p>
                <a href="https://facebook.com/" aria-label="Facebook" target="_blank"><p>Facebook : https://www.facebook.com</p></a>
                <a href="https://www.tiktok.com/" aria-label="Facebook" target="_blank"><p>Tiktok : https://www.tiktok.com </p></a>
                <a href="https://www.instagram.com/" aria-label="Facebook" target="_blank"><p>Instagram : https://www.instagram.com</p></a>
                <a href="https://www.youtube.com/" aria-label="Facebook" target="_blank"><p>Youtube : https://www.youtube.com</p></a>
            </div>
</section>

    )
}

