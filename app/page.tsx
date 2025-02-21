'use client';

import { useState } from 'react';

import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import Main from '@/components/home/main';

export default function UrlShortener() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className='dark:bg-slate-950 min-h-screen'>
                <Header />
                <Main />
                <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </div>
    );
}
