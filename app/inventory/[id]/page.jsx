'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VehicleDetailPage({ params }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allVehicles, setAllVehicles] = useState([]);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setAllVehicles(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Error loading vehicle details');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && allVehicles.length > 0) {
      const found = allVehicles.find(v => v.id === id);
      if (found) {
        setVehicle(found);
        setError(null);
      } else {
        setError('Vehicle not found');
      }
    }
  }, [loading, allVehicles, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading vehicle details...</div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/inventory" className="text-blue-400 hover:text-blue-300">
            &larr; Back to Inventory
          </Link>
          <div className="text-white text-2xl mt-8">{error || 'Vehicle not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/inventory" className="text-blue-400 hover:text-blue-300">
          &larr; Back to Inventory
        </Link>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <img
              src={`https://source.unsplash.com/800x600/?${encodeURIComponent(vehicle.make + ' ' + vehicle.model)},car`}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop';
              }}
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              {vehicle.colour || vehicle.color} &middot; {vehicle.km.toLocaleString()} km
            </p>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
              <p className="text-slate-400 text-sm mb-1">Price</p>
              <p className="text-3xl font-bold text-blue-400">
                {vehicle.price === 0 ? 'Contact for Price' : `$${vehicle.price.toLocaleString()}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Year</p>
                <p className="text-white font-semibold">{vehicle.year}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Mileage</p>
                <p className="text-white font-semibold">{vehicle.km.toLocaleString()} km</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Color</p>
                <p className="text-white font-semibold">{vehicle.colour || vehicle.color}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-slate-400 text-sm">Status</p>
                <p className={`font-semibold ${vehicle.status === 'AVAILABLE' ? 'text-green-400' : 'text-red-400'}`}>
                  {vehicle.status}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="tel:+19029000000"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Call for More Info
              </a>
              <Link
                href="/inventory"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                View All Inventory
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-400 text-sm">Make</p>
              <p className="text-white font-semibold">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Model</p>
              <p className="text-white font-semibold">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Year</p>
              <p className="text-white font-semibold">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Stock #</p>
              <p className="text-white font-semibold">{vehicle.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
