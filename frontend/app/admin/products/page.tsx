
'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AdminProducts(){
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({title:'', description:'', price_cents: 1999, stock: 10, image_url:''});
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')||'null') : null;

  useEffect(()=>{
    fetch(`${API}/products`).then(r=>r.json()).then(setItems);
  },[]);

  async function create(){
    if(!token){ alert('Login as admin'); return; }
    const res = await fetch(`${API}/products`, {method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify(form)});
    if(!res.ok){ alert('Failed (admin?)'); return; }
    setItems([await res.json(), ...items]);
    setForm({title:'', description:'', price_cents: 1999, stock: 10, image_url:''});
  }

  async function del(id:number){
    if(!token){ return; }
    const res = await fetch(`${API}/products/${id}`, {method:'DELETE', headers:{'Authorization':`Bearer ${token}`}});
    if(res.ok){ setItems(items.filter(x=>x.id!==id)); }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin / Products</h2>
      <div className="card space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})} />
          <input className="input col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <input className="input" type="number" placeholder="Price cents" value={form.price_cents} onChange={e=>setForm({...form, price_cents:Number(e.target.value)})} />
          <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:Number(e.target.value)})} />
        </div>
        <button className="btn" onClick={create}>Create</button>
        {user?.is_admin ? <span className="text-green-700 text-sm ml-2">You are admin</span> : <span className="text-red-700 text-sm ml-2">Not admin</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => (
          <div key={p.id} className="card">
            <img src={p.image_url || 'https://placehold.co/600x400'} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">${(p.price_cents/100).toFixed(2)}</div>
              </div>
              <button className="btn" onClick={()=>del(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
