import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "VendNest",
  description: "Product catalog, cart, and admin tools for small sellers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="container py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold">VendNest</Link>
            <div className="ml-auto flex gap-3">
              <Link className="link" href="/login">Login</Link>
              <Link className="link" href="/register">Register</Link>
              <Link className="link" href="/cart">Cart</Link>
              <Link className="link" href="/admin/products">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
