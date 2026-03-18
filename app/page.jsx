'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MOCK_VEHICLES = [
  {
    id: '1',
    year: 2021,
    make: 'Toyota',
    model: 'RAV4',
    trim: 'XLE',
    price: 32995,
    mileage: 42000,
    photos: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg'],
    status: 'Available',
  },
  {
    id: '2',
    year: 2019,
    make: 'Honda',
    model: 'Civic',
    trim: 'LX',
    price: 18995,
    mileage: 65000,
    photos: ['https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg'],
    status: 'Available',
  },
  {
    id: '3',
    year: 2020,
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    price: 28500,
    mileage: 58000,
    photos: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'],
    status: 'Available',
  },
];

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    setVehicles(MOCK_VEHICLES);
  }, []);
  return (
    <main>
      <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: 'white', textAlign: 'center', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Car Nova</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>Quality pre-owned vehicles. Simple, transparent, and local.</p>
        <Link href="/inventory" style={{ display: 'inline-block', background: 'white', color: '#1e293b', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
          View Full Inventory
        </Link>
      </section>
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Featured Vehicles</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {vehicles.map(v => (
            <Link key={v.id} href={`/inventory/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s', cursor: 'pointer' }} onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)')}>
                {v.photos?.[0] && (
                  <img src={v.photos[0]} alt={`${v.year} ${v.make} ${v.model}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {v.year} {v.make} {v.model}
                  </div>
                  {v.mileage && <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem' }}>{v.mileage.toLocaleString()} km</div>}
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>
                    ${v.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
