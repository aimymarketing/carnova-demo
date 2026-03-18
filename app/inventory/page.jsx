'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    let filtered = filter === 'All' ? vehicles : vehicles.filter(v => v.status === filter);
    
    // Apply sorting
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year-new') {
      filtered = [...filtered].sort((a, b) => b.year - a.year);
    } else if (sortBy === 'year-old') {
      filtered = [...filtered].sort((a, b) => a.year - b.year);
    }
    
    setFilteredVehicles(filtered);
  }, [vehicles, filter, sortBy]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // Fetch from DMS - using available endpoint
      const response = await fetch('https://carnova-dms.web.app/api/vehicles', {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        // Fallback: fetch and parse from inventory page
        const pageResponse = await fetch('https://carnova-dms.web.app/');
        const html = await pageResponse.text();
        
        // For now, use mock data as fallback
        const mockData = [
          { id: '0101', year: 2000, make: 'BMW', model: 'R1100RT', color: 'Green', price: 130000, mileage: 0, image: '/cars/bmw-r1100rt.jpg', status: 'Available' },
          { id: '1324', year: 1986, make: 'Nissan', model: '300ZX', color: 'Red', price: 200000, mileage: 0, image: '/cars/nissan-300zx.jpg', status: 'Available' },
          { id: '0202', year: 1970, make: 'Fetion', model: 'Quadracycle', color: 'Blue', price: 0, mileage: 0, image: '/cars/fetion-quadracycle.jpg', status: 'Available' },
          { id: '602-150', year: 2016, make: 'Volkswagen', model: 'Golf TSI S', color: 'Pure White', price: 288101, mileage: 288.101, image: '/cars/vw-golf.jpg', status: 'Available' },
          { id: '602-155A', year: 2016, make: 'Honda', model: 'Civic LX', color: 'Lunar Silver Metallic', price: 105788, mileage: 105.788, image: '/cars/honda-civic.jpg', status: 'Available' },
          { id: '509-119', year: 2013, make: 'Jeep', model: 'Patriot', color: 'Black', price: 232000, mileage: 232, image: '/cars/jeep-patriot.jpg', status: 'Available' },
          { id: '511-131', year: 2013, make: 'Nissan', model: 'Pathfinder SV', color: 'Super Black', price: 182145, mileage: 182.145, image: '/cars/nissan-pathfinder.jpg', status: 'Available' },
          { id: '601-144', year: 2013, make: 'Kia', model: 'Forte EX', color: 'Gunmetal Grey Pearl', price: 240125, mileage: 240.125, image: '/cars/kia-forte.jpg', status: 'Available' },
        ];
        setVehicles(mockData);
        setError(null);
        return;
      }
      
      const data = await response.json();
      // Filter only available vehicles
      const availableVehicles = data.filter(v => v.status === 'Available');
      setVehicles(availableVehicles);
      setError(null);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to load vehicles');
      // Fallback to mock data
      const mockData = [
        { id: '0101', year: 2000, make: 'BMW', model: 'R1100RT', color: 'Green', price: 130000, mileage: 0, image: '/cars/bmw-r1100rt.jpg', status: 'Available' },
        { id: '1324', year: 1986, make: 'Nissan', model: '300ZX', color: 'Red', price: 200000, mileage: 0, image: '/cars/nissan-300zx.jpg', status: 'Available' },
        { id: '0202', year: 1970, make: 'Fetion', model: 'Quadracycle', color: 'Blue', price: 0, mileage: 0, image: '/cars/fetion-quadracycle.jpg', status: 'Available' },
        { id: '602-150', year: 2016, make: 'Volkswagen', model: 'Golf TSI S', color: 'Pure White', price: 288101, mileage: 288.101, image: '/cars/vw-golf.jpg', status: 'Available' },
        { id: '602-155A', year: 2016, make: 'Honda', model: 'Civic LX', color: 'Lunar Silver Metallic', price: 105788, mileage: 105.788, image: '/cars/honda-civic.jpg', status: 'Available' },
        { id: '509-119', year: 2013, make: 'Jeep', model: 'Patriot', color: 'Black', price: 232000, mileage: 232, image: '/cars/jeep-patriot.jpg', status: 'Available' },
        { id: '511-131', year: 2013, make: 'Nissan', model: 'Pathfinder SV', color: 'Super Black', price: 182145, mileage: 182.145, image: '/cars/nissan-pathfinder.jpg', status: 'Available' },
        { id: '601-144', year: 2013, make: 'Kia', model: 'Forte EX', color: 'Gunmetal Grey Pearl', price: 240125, mileage: 240.125, image: '/cars/kia-forte.jpg', status: 'Available' },
      ];
      setVehicles(mockData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="py-8 px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-2">Vehicle Inventory</h1>
          <p className="text-gray-600">Loading vehicles...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-2">Vehicle Inventory</h1>
        <p className="text-gray-600 mb-8">{filteredVehicles.length} vehicles available</p>
        
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
        
        {/* Filter and Sort Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option>All</option>
                <option>Available</option>
                <option>Sold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest</option>
                <option value="year-old">Year: Oldest</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Link key={vehicle.id} href={`/inventory/${vehicle.id}`}>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-car.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-blue-600 text-xl font-bold mb-2">
                    ${vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {vehicle.mileage.toLocaleString()} miles
                  </p>
                  <p className="text-gray-500 text-sm">
                    {vehicle.color}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No vehicles found matching your criteria.</p>
          </div>
        )}
      </section>
    </main>
  );
}
