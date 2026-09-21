import "./globals.css";
import Providers from "./providers";


export const metadata = {
    title: "ShopIn. | Everyday finds",
    description: "Simple things. Better picks.",
};
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}