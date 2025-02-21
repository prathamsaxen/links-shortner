import React from 'react';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';

interface FooterProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, setDarkMode }) => {
    return (
        <div className='fixed right-4 bottom-4 flex flex-col gap-2'>
            <Button variant='outline' size='icon' className='rounded-full h-10 w-10 dark:bg-slate-900' onClick={() => setDarkMode(!darkMode)}>
                <Settings className='h-4 w-4' />
            </Button>
        </div>
    );
};

export default Footer;
