'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

const SlugPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string | undefined;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${API_BASE_URL}/${slug}`, {
                    method: 'GET',
                    headers: { 'x-token': `${process.env.NEXT_PUBLIC_TOKEN}` }
                });

                const result = await response.json();

                if (result.originalLink) {
                    router.push(result.originalLink);
                } else {
                    throw new Error('No redirect URL found in the response');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(`Error: ${(error as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, router]);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
                <p className='mt-4 text-lg font-semibold text-gray-700'>Redirecting to your link...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
                    <h2 className='text-2xl font-bold text-red-600 mb-4'>Invalid or Expired Link</h2>
                    <p className='text-gray-600 mb-4'>{error}</p>
                    <button onClick={() => router.push('/')} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    // This return is not necessary as the component will either be in a loading state,
    // show an error, or redirect. But we'll keep it to satisfy TypeScript.
    return null;
};

export default SlugPage;
