import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Link } from 'lucide-react';

interface LinkData {
    _id: string;
    shortLink: string;
    originalLink: string;
    clicks: number;
    status: 'Active' | 'Inactive';
    createdAt: string;
}

const Main: React.FC = () => {
    const [autoPaste, setAutoPaste] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [linksData, setLinksData] = useState<LinkData[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}`, {
                headers: { 'x-token': `${process.env.NEXT_PUBLIC_TOKEN}` }
            });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data: LinkData[] = await response.json();
            setLinksData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isValidUrl = (str: string) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
            'localhost|' + // localhost
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IPv4 address
            '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*' + // port and path
            '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z0-9_]*)?$', // fragment locator
            'i'
        );
        return urlPattern.test(str);
    };

    const handleShortenLink = async () => {
        if (!url.trim()) {
            setError('URL cannot be empty.');
            return;
        }

        if (!isValidUrl(url)) {
            setError('Invalid URL format.');
            return;
        }

        setError(null);
        console.log(process.env.NEXT_PUBLIC_TOKEN)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': `${process.env.NEXT_PUBLIC_TOKEN}`
                },
                body: JSON.stringify({ originalLink: url }),
            });

            if (!response.ok) throw new Error('Failed to shorten URL');

            await fetchData(); // Refresh the links list
            setUrl(''); // Clear input after successful submission
        } catch (error) {
            console.error('Error shortening link:', error);
        }
    };

    return (
        <main className='container mx-auto px-4 py-12'>
            <div className='text-center max-w-3xl mx-auto mb-12'>
                <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-transparent bg-clip-text'>Shorten Your Loooong Links :)</h2>
                <p className='text-muted-foreground'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
            </div>

            <div className='max-w-2xl mx-auto mb-12'>
                <div className='relative'>
                    <Input 
                        placeholder='Enter the link here' 
                        className='pr-32 h-12 dark:bg-slate-900' 
                        type='url' 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                    />
                    <Button 
                        className='absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 h-10' 
                        onClick={handleShortenLink}
                    >
                        Shorten Now!
                    </Button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className='flex items-center gap-2 mt-4 justify-center'>
                    <Switch checked={autoPaste} onCheckedChange={setAutoPaste} className='data-[state=checked]:bg-blue-600' />
                    <label className='text-sm text-muted-foreground'>Auto Paste from Clipboard</label>
                </div>
            </div>

            <div className='rounded-lg border dark:border-slate-800 overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow className='dark:bg-slate-900'>
                            <TableHead>Short Link</TableHead>
                            <TableHead>Original Link</TableHead>
                            <TableHead>QR Code</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {linksData.map((item) => (
                            <TableRow key={item._id} className='dark:hover:bg-slate-900/50'>
                                <TableCell className='font-medium'>
                                    <div className='flex items-center gap-2'>
                                        {item.shortLink}
                                        <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                                            <Copy className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell>{item.originalLink}</TableCell>
                                <TableCell>
                                    <div className='w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center'>
                                        <Link className='w-4 h-4' />
                                    </div>
                                </TableCell>
                                <TableCell>{item.clicks}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    );
};

export default Main;
