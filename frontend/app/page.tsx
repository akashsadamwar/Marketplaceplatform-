
'use client';
import useSWR from 'swr';
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function HomePage() {
  const [q, setQ] = useState('');
  const { data, isLoading } = useSWR(`${API}/products${q ? `?q=${encodeURIComponent(q)}` : ''}`, fetcher);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="input" placeholder="Search the catalog…" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((p: any) => (
          <div key={p.id} className="card">
            <img src={p.image_url || 'https://placehold.co/600x400'} alt={p.title} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 font-medium">{p.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span>${(p.price_cents/100).toFixed(2)}</span>
              <button className="btn" onClick={()=>{
                const cart = JSON.parse(localStorage.getItem('cart')||'[]');
                const idx = cart.findIndex((x:any)=>x.product_id===p.id);
                if (idx>=0) { cart[idx].qty += 1; } else { cart.push({product_id:p.id, qty:1, price_cents:p.price_cents}); }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Saved to your cart');
              }}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
