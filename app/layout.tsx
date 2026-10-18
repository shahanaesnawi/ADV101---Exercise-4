import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Pure Notes" };

// little decorations for the cute background
const bits = ["♥", "✦", "★", "✿", "♥", "✦", "✿", "★", "♥", "✦", "✿", "♥", "★", "✦", "♥", "✿"];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg" aria-hidden="true">
          {bits.map((b, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37 + 6) % 94}%`,
                top: `${(i * 53 + 4) % 90}%`,
                fontSize: `${20 + ((i * 7) % 28)}px`,
                animationDelay: `${(i % 7) * -1.3}s`,
                animationDuration: `${7 + (i % 5) * 2}s`,
              }}
            >
              {b}
            </span>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
