'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <footer className='w-full border-t dark:border-slate-800'>
            <div className='fixed right-4 bottom-4 flex flex-col gap-2'>
                {isMounted && (
                    <Button variant='outline' size='icon' className='rounded-full h-10 w-10 dark:bg-slate-900' onClick={toggleTheme}>
                        {resolvedTheme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
                    </Button>
                )}
            </div>

            <div className='container mx-auto py-6 px-4 text-center text-sm text-muted-foreground'>Developed by Pratham Saxena</div>
        </footer>
    );
};

export default Footer;
