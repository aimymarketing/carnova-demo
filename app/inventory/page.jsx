'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  const getImageUrl = (make, model, colour, year) => {
    const makeLower = make.toLowerCase();
    const modelLower = (model || '').toLowerCase();
    const colourLower = (colour || '').toLowerCase();
    // Harley-Davidson / Motorcycle
    if (makeLower.includes('harley') || modelLower.includes('road glide') || modelLower.includes('sportster') || modelLower.includes('vrod')) {
      return 'https://images.pexels.com/photos/1915149/pexels-photo-1915149.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Cargo / Delivery Van (Nissan NV200, Ram, etc.)
    if (modelLower.includes('nv200') || modelLower.includes('cargo') || modelLower.includes('van')) {
      return 'https://images.pexels.com/photos/7363099/pexels-photo-7363099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Pickup Trucks (Ram 1500, Ford F-150, Tundra)
    if (modelLower.includes('1500') || modelLower.includes('f-150') || modelLower.includes('tundra')) {
      return 'https://images.pexels.com/photos/1585041/pexels-photo-1585041.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Audi / Sedan
    if (makeLower.includes('audi')) {
      return 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Volkswagen
    if (makeLower.includes('volkswagen') || makeLower.includes('vw')) {
      return 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Ford
    if (makeLower.includes('ford')) {
      return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // BMW
    if (makeLower.includes('bmw')) {
      return 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Dodge / Jeep
    if (makeLower.includes('dodge') || makeLower.includes('jeep')) {
      return 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Toyota
    if (makeLower.includes('toyota')) {
      return 'https://images.pexels.com/photos/159314/pexels-photo-159314.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Hyundai
    if (makeLower.includes('hyundai')) {
      return 'https://images.pexels.com/photos/1164196/pexels-photo-1164196.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Mazda
    if (makeLower.includes('mazda')) {
      return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Infiniti
    if (makeLower.includes('infiniti')) {
      return 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Subaru
    if (makeLower.includes('subaru')) {
      return 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Pedlon / Classic
    if (makeLower.includes('pedlon')) {
      return 'https://images.pexels.com/photos/2524860/pexels-photo-2524860.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
    }
    // Default car image
    return 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600&h=400';
  };
  const getStatusEmoji = (make) => {
    const lower = make.toLowerCase();
    if (lower.includes('harley') || lower.includes('bmw') && lower.includes('r')) return '\u{1F3CD}';
    if (lower.includes('ram') || lower.includes('ford') && lower.includes('f-')) return '\u{1F69B}';
    if (lower.includes('pedlon')) return '\u{1F6B4}';
    if (lower.includes('jeep')) return '\u{1F699}';
    return '\u{1F697}';
  };

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
    } else if (sortBy === 'mileage-asc') {
      filtered = [...filtered].sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
    }

    setFilteredVehicles(filtered);
  }, [vehicles, filter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Our Inventory</h1>
        <p className="text-xl">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-2">Our Inventory</h1>
      <p className="text-gray-600 mb-6">{filteredVehicles.length} vehicles available</p>

      <div className="flex gap-4 mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Year: Newest First</option>
          <option value="make-asc">Make: A-Z</option>
          <option value="mileage-asc">Mileage: Low to High</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <Link
            key={vehicle.stock_number}
            href={`/inventory/${vehicle.stock_number}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
             src={getImageUrl(vehicle.make, vehicle.model,vehicle.colour, vehicle.year)}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-gray-600">
                {vehicle.color} \u00B7 {(vehicle.mileage || 0).toLocaleString()} km
              </p>
              <p className={`mt-2 font-semibold ${vehicle.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'}`}>
                {vehicle.status}
              </p>
              <p className="text-2xl font-bold mt-2">${vehicle.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
