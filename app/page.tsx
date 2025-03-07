'use client';

import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import Main from '@/components/home/main';
import { useTheme } from 'next-themes';

export default function UrlShortener() {
    const { resolvedTheme } = useTheme();

    return (
        <div className={`min-h-screen ${resolvedTheme === 'dark' && 'dark'}`}>
            <div className='dark:bg-slate-950 min-h-screen'>
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    );
}
