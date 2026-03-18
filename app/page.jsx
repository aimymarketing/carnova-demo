// Car Nova Demo - DMS Integration
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        const available = data.filter(v => v.status === 'AVAILABLE');
        setFeaturedVehicles(available.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured vehicles:', err);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const getImageUrl = (make, model, year) => {
    const makeLower = make.toLowerCase().replace(/[^a-z0-9]/g, '');
    const seed = `${makeLower}${year}`;
    return `https://picsum.photos/seed/${seed}/400/250`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Car Nova</h1>
          <p className="text-xl text-slate-300 mb-8">Quality pre-owned vehicles. Simple, transparent, and local.</p>
          <Link href="/inventory" className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition">
            View Full Inventory
          </Link>
        </div>
      </section>
      {/* Featured Vehicles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Vehicles</h2>
          <p className="text-slate-600 mb-8">Check out our top picks</p>

          {loading ? (
            <p className="text-slate-500">Loading featured vehicles...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <Link href={`/inventory/${vehicle.id}`} key={vehicle.id} className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <img
                      src={getImageUrl(vehicle.make, vehicle.model, vehicle.year)}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-slate-500 text-sm mb-2">
                        {vehicle.colour || vehicle.color} · {vehicle.km.toLocaleString()} km
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ${vehicle.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
  // Force redeploy with contact page included - timestamp
}
