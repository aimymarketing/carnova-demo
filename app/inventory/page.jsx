'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const getImageUrl = (make, model, colour, year) => {
    const makeLower = make.toLowerCase();
    const modelLower = (model || '').toLowerCase();
    
    if (makeLower.includes('harley') || modelLower.includes('road glide') || modelLower.includes('sportster') || modelLower.includes('vrod')) {
      return 'https://images.pexels.com/photos/1915149/pexels-photo-1915149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (modelLower.includes('nv200') || modelLower.includes('cargo') || modelLower.includes('van') || modelLower.includes('caravan')) {
      return 'https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (modelLower.includes('1500') || modelLower.includes('f-150') || modelLower.includes('f-350') || modelLower.includes('tundra') || modelLower.includes('outdoorsman')) {
      return 'https://images.pexels.com/photos/1585041/pexels-photo-1585041.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('audi') || (makeLower.includes('infiniti'))) {
      return 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('volkswagen') || makeLower.includes('vw') || makeLower.includes('jetta')) {
      return 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('ford') || makeLower.includes('edge') || makeLower.includes('escape')) {
      return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('bmw')) {
      return 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('dodge') || makeLower.includes('jeep') || makeLower.includes('journey') || makeLower.includes('renegade')) {
      return 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('toyota')) {
      return 'https://images.pexels.com/photos/159314/pexels-photo-159314.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('hyundai')) {
      return 'https://images.pexels.com/photos/1164196/pexels-photo-1164196.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('mazda')) {
      return 'https://images.pexels.com/photos/1065014/pexels-photo-1065014.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('subaru') || makeLower.includes('outback') || makeLower.includes('crosstrek')) {
      return 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('pedlon') || makeLower.includes('300zx')) {
      return 'https://images.pexels.com/photos/2524860/pexels-photo-2524860.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    if (makeLower.includes('nissan')) {
      return 'https://images.pexels.com/photos/2097449/pexels-photo-2097449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
    }
    return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setLoading(false);
      }
    };
    
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = filter === 'all' ? vehicles : vehicles.filter(v => v.status === filter);
    
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'year-desc') {
      filtered = [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'make-asc') {
      filtered = [...filtered].sort((a, b) => a.make.localeCompare(b.make));
    } else if (sortBy === 'km-asc') {
      filtered = [...filtered].sort((a, b) => (a.km || 0) - (b.km || 0));
    }
    
    setFilteredVehicles(filtered);
  }, [vehicles, filter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-slate-50">
        <h1 className="text-4xl font-bold mb-8">Our Inventory</h1>
        <p className="text-xl text-gray-600">Loading vehicles from DMS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Inventory</h1>
          <p className="text-slate-600 mb-4">{filteredVehicles.length} vehicles available</p>
          <p className="text-sm text-slate-500">Last updated: {lastUpdate} (Auto-refreshes every 30 seconds)</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-slate-300 p-2 rounded bg-white hover:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-300 p-2 rounded bg-white hover:border-blue-500"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="make-asc">Make: A-Z</option>
            <option value="km-asc">Mileage: Low to High</option>
          </select>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/inventory/${vehicle.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image Container - Fixed Height */}
              <div className="relative h-56 overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={getImageUrl(vehicle.make, vehicle.model, vehicle.colour, vehicle.year)}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  vehicle.status === 'AVAILABLE' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {vehicle.status === 'AVAILABLE' ? '✓ Available' : 'Sold'}
                </div>
              </div>

              {/* Content Container - Scrolls if needed */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>

                {/* Quick Specs - 2 columns */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <p className="text-slate-500 font-medium">Color</p>
                    <p className="text-slate-900 font-semibold">{vehicle.colour || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Mileage</p>
                    <p className="text-slate-900 font-semibold">{(vehicle.km || 0).toLocaleString()} km</p>
                  </div>
                </div>

                {/* Price - Large and Bold */}
                <div className="mb-3 border-t border-b border-slate-200 py-2">
                  <p className="text-2xl font-bold text-blue-600">
                    ${(vehicle.price || 0).toLocaleString()}
                  </p>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors mt-auto">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No vehicles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
