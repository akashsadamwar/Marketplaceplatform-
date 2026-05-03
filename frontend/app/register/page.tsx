
'use client';
import { useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RegisterPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h2 className="text-lg font-semibold">Register</h2>
      <label className="label">Email</label>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      <label className="label">Password</label>
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn w-full" onClick={async ()=>{
        const r = await fetch(`${API}/auth/register`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password})});
        if (!r.ok){ alert('Failed'); return; }
        alert('Registered! Now login.'); location.href='/login';
      }}>Create account</button>
    </div>
  )
}
