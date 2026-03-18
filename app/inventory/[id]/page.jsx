'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VehicleDetailPage({ params }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allVehicles, setAllVehicles] = useState([]);
  
  const { id } = params;

  // Fetch all vehicles from API
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

  // Find the specific vehicle once data is loaded
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
          <Link href="/inventory" className="text-blue-400 hover:underline mb-8 block">
            ← Back to Inventory
          </Link>
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-6 rounded-lg">
            {error || 'Vehicle not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/inventory" className="text-blue-400 hover:underline mb-8 block">
          ← Back to Inventory
        </Link>

        {/* Vehicle Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div>
              <div className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                <span className="text-white/30 text-9xl">
                  {vehicle.make === 'Nissan' ? '🚗' : 
                   vehicle.make === 'Harley-Davidson' ? '🏍' : 
                   vehicle.make === 'Audi' ? '🚗' : 
                   vehicle.make === 'Ford' ? '🚗' : 
                   vehicle.make === 'Jeep' ? '🚙' : 
                   vehicle.make === 'Volkswagen' ? '🚗' : 
                   vehicle.make === 'Dodge' ? '🚗' : 
                   vehicle.make === 'Infiniti' ? '🚗' : 
                   vehicle.make === 'BMW' ? '🚗' : 
                   vehicle.make === 'Mazda' ? '🚗' : 
                   vehicle.make === 'Hyundai' ? '🚗' : 
                   vehicle.make === 'Subaru' ? '🚗' : 
                   vehicle.make === 'Toyota' ? '🚗' : 
                   vehicle.make === 'Ram' ? '🚛' : 
                   vehicle.make === 'Pedlon' ? '🚴' : '🚗'}
                </span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-slate-400 mb-4">
                {vehicle.colour || vehicle.color} · {vehicle.km.toLocaleString()} km
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm">Price</p>
                <p className="text-4xl font-bold text-blue-400">
                  {vehicle.price === 0 ? 'Contact for Price' : `$${vehicle.price.toLocaleString()}`}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Year</p>
                  <p className="text-2xl font-bold text-white">{vehicle.year}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Mileage</p>
                  <p className="text-2xl font-bold text-white">{vehicle.km.toLocaleString()} km</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Color</p>
                  <p className="text-2xl font-bold text-white">{vehicle.colour || vehicle.color}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className="text-2xl font-bold text-green-400">{vehicle.status}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <a
                  href="tel:+19029000000"
                  className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Call for More Info
                </a>
                <a
                  href="/inventory"
                  className="w-full block text-center bg-white/10 border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
                >
                  View All Inventory
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 font-semibold">Make</p>
              <p className="text-lg text-white">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Model</p>
              <p className="text-lg text-white">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Year</p>
              <p className="text-lg text-white">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Stock #</p>
              <p className="text-lg text-white">{vehicle.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
