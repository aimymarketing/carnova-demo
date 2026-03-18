'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Filter vehicles
  useEffect(() => {
    let filtered = filter === 'all' ? vehicles : vehicles.filter(v => v.status === filter);
    
    // Sort
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year-desc') {
      filtered = [...filtered].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'make') {
      filtered = [...filtered].sort((a, b) => a.make.localeCompare(b.make));
    } else if (sortBy === 'mileage') {
      filtered = [...filtered].sort((a, b) => a.km - b.km);
    }
    
    setFilteredVehicles(filtered);
  }, [vehicles, filter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">Our Inventory</h1>
        <p className="text-slate-300 mb-8">{vehicles.length} vehicles available</p>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="make">Make: A-Z</option>
            <option value="mileage">Mileage: Low to High</option>
          </select>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Link href={`/inventory/${vehicle.id}`} key={vehicle.id}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <span className="text-white/50 text-6xl">
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
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {vehicle.colour || vehicle.color} · {vehicle.km.toLocaleString()} km
                      </p>
                    </div>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${
                      vehicle.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' : 
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">
                    ${vehicle.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
