
'use client';
import { useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h2 className="text-lg font-semibold">Login</h2>
      <label className="label">Email</label>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      <label className="label">Password</label>
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn w-full" onClick={async ()=>{
        const res = await fetch(`${API}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password})});
        if (!res.ok){ alert('Invalid'); return; }
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        location.href = '/';
      }}>Sign in</button>
    </div>
  )
}
