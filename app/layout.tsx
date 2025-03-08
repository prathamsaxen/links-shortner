import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvidersContext } from '@/provider/theme-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Linkly - URL Shortener',
    description: 'Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.',
    keywords: 'URL shortener, link shortener, short links, URL management',
    authors: [{ name: 'Pratham Saxena' }],
    openGraph: {
        title: 'Linkly - URL Shortener',
        description: 'Shorten your long URLs with Linkly',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Linkly - URL Shortener',
        description: 'Shorten your long URLs with Linkly'
    },
    icons:{
        icon:'/favicon.ico'
    }
};
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvidersContext>{children}</ThemeProvidersContext>
            </body>
        </html>
    );
}
