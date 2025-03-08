'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    if (!isMounted) return null;

    return (
        <Button variant='outline' size='icon' className='rounded-full h-9 w-9 dark:bg-slate-900' onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
        </Button>
    );
}
