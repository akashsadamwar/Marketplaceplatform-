
'use client';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function CartPage(){
  const cart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')||'[]') : [];
  const total = cart.reduce((s:any, x:any)=> s + x.price_cents * x.qty, 0);
  async function checkout(){
    const token = localStorage.getItem('token'); if(!token){ alert('Login first'); return; }
    const res = await fetch(`${API}/orders`, { method: 'POST', headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}, body: JSON.stringify(cart.map((x:any)=>({product_id:x.product_id, qty:x.qty}))) });
    const data = await res.json();
    if (!res.ok){ alert('Order failed'); return; }
    const pay = await fetch(`${API}/orders/${data.id}/pay`, {method:'POST', headers: {'Authorization': `Bearer ${token}`}});
    if (!pay.ok){ alert('Payment mock failed'); return; }
    localStorage.removeItem('cart'); alert('Order paid!'); location.href='/';
  }
  return (
    <div className="max-w-lg mx-auto card space-y-3">
      <h2 className="text-lg font-semibold">Cart</h2>
      {cart.length===0 ? <p>No items.</p> : (
        <>
          <ul className="space-y-2">
            {cart.map((x:any, i:number)=> (
              <li key={i} className="flex justify-between">
                <span>Product #{x.product_id} × {x.qty}</span>
                <span>${(x.price_cents*x.qty/100).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${(total/100).toFixed(2)}</span>
          </div>
          <button className="btn w-full" onClick={checkout}>Checkout (mock)</button>
        </>
      )}
    </div>
  )
}
