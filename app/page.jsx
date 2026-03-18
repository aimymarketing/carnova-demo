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

  const getImageUrl = (make, model, colour, year) => {
    const makeLower = make.toLowerCase();
    const modelLower = (model || '').toLowerCase();
    const colourLower = (colour || '').toLowerCase();

    // Harley-Davidson / Motorcycle
    if (makeLower.includes('harley') || modelLower.includes('road glide') || modelLower.includes('sportster') || modelLower.includes('vrod')) {
      return 'https://images.pexels.com/photos/1915149/pexels-photo-1915149.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Cargo / Delivery Van (Nissan NV200, Ram, etc.)
    if (modelLower.includes('nv200') || modelLower.includes('cargo') || modelLower.includes('van') || modelLower.includes('v6')) {
      return 'https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Audi / Sedan
    if (makeLower.includes('audi')) {
      return 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Volkswagen
    if (makeLower.includes('volkswagen') || makeLower.includes('vw')) {
      return 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Ford
    if (makeLower.includes('ford')) {
      return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // BMW
    if (makeLower.includes('bmw')) {
      return 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Dodge / Jeep
    if (makeLower.includes('dodge') || makeLower.includes('jeep')) {
      return 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Toyota
    if (makeLower.includes('toyota')) {
      return 'https://images.pexels.com/photos/159314/pexels-photo-159314.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Hyundai
    if (makeLower.includes('hyundai')) {
      return 'https://images.pexels.com/photos/1164196/pexels-photo-1164196.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Mazda
    if (makeLower.includes('mazda')) {
      return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Infiniti
    if (makeLower.includes('infiniti')) {
      return 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Subaru
    if (makeLower.includes('subaru')) {
      return 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
    }

    // Default car image
    return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400&h=250';
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
                      src={getImageUrl(vehicle.make, vehicle.model, vehicle.colour || vehicle.color, vehicle.year)}
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
}
