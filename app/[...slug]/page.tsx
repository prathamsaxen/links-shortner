'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
// import { useToast } from "@/components/ui/use-toast"

const SlugPage = () => {
    const params = useParams();
    const router = useRouter();
    //   const { toast } = useToast()
    const slug = params?.slug as string | undefined;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                // Use our internal API route instead of directly calling the external API
                const response = await fetch(`/api/${slug}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to retrieve the original link');
                }

                const result = await response.json();

                if (result.originalLink) {
                    // Show a toast before redirecting
                    //   toast({
                    //     description: "Redirecting you to the destination...",
                    //   })

                    // Short delay to allow the toast to be seen
                    setTimeout(() => {
                        router.push(result.originalLink);
                    }, 1000);
                } else {
                    throw new Error('No redirect URL found in the response');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setError(`${(error as Error).message}`);

                // toast({
                //   title: "Error",
                //   description: "This link appears to be invalid or has expired.",
                //   variant: "destructive",
                // })
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, router]);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
                <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
                <p className='mt-4 text-lg font-semibold'>Redirecting to your link...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
                <div className='bg-card p-8 rounded-lg shadow-md max-w-md w-full border'>
                    <h2 className='text-2xl font-bold text-red-600 mb-4'>Invalid or Expired Link</h2>
                    <p className='text-muted-foreground mb-6'>{error}</p>
                    <button onClick={() => router.push('/')} className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
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
