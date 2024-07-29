"use client";
import useSWR from 'swr';

interface PageProps {
    params: {
        symbol: string;
    }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Page = ({ params }: PageProps) => {
    const { data, error } = useSWR('/api/stock/' + params.symbol, fetcher);

    return data ? <div>
        <p>Symbol: {data.symbol}</p>
        <p>Price: ${data.price}</p>
    </div> : error ? <p>Error!</p> : <p>Loading...</p>;
}

export default Page;