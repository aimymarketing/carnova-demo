'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filter, setFilter] = useState('Available');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // All 29 available vehicles from DMS
  const allVehicles = [
    { id: '01234', year: 2021, make: 'Nissan', model: 'NV200', color: 'White', price: 19995, mileage: 71, status: 'Available', description: 'Reliable work vehicle in excellent condition.' },
    { id: 'NO05882', year: 2019, make: 'Harley-Davidson', model: 'Road Glide', color: 'Red', price: 27900, mileage: 45, status: 'Available', description: 'Premium motorcycle with highway comfort features.' },
    { id: '543221', year: 2015, make: 'Audi', model: 'S3', color: 'Dark Gray', price: 9995, mileage: 196.04, status: 'Available', description: 'Sporty sedan with modern amenities.' },
    { id: '510-120', year: 2015, make: 'Ford', model: 'Edge SEL', color: 'Deep Impact Blue', price: 9995, mileage: 177.957, status: 'Available', description: 'Spacious SUV perfect for families.' },
    { id: '602-154', year: 2015, make: 'Jeep', model: 'Renegade Latitude', color: 'Sierra Blue', price: 8995, mileage: 181.534, status: 'Available', description: 'Adventure-ready compact SUV.' },
    { id: '602-151', year: 2015, make: 'Volkswagen', model: 'Jetta 2.0L Trendline w/Technology', color: 'Black', price: 7995, mileage: 166.066, status: 'Available', description: 'Fuel-efficient sedan with technology package.' },
    { id: '512-136', year: 2015, make: 'Dodge', model: 'Grand Caravan', color: 'Granite Crystal', price: 6995, mileage: 237.816, status: 'Available', description: 'Family minivan with convenience features.' },
    { id: 'R1', year: 2014, make: 'Infiniti', model: 'QX60', color: 'Moonlight White', price: 8995, mileage: 181.111, status: 'Available', description: 'Luxury crossover with premium interior.' },
    { id: '512-142', year: 2014, make: 'BMW', model: 'X6 xDrive50i', color: 'Alpine White', price: 12995, mileage: 281.513, status: 'Available', description: 'High-performance luxury SUV.' },
    { id: '601-145', year: 2014, make: 'Mazda', model: 'Mazda5 Grand Touring', color: 'Jet Black', price: 5995, mileage: 206.674, status: 'Available', description: 'Versatile compact SUV for active families.' },
    { id: '602-153', year: 2013, make: 'Dodge', model: 'Journey R/T', color: 'Black', price: 5995, mileage: 220.125, status: 'Available', description: 'Spacious crossover with R/T performance.' },
    { id: '602-153B', year: 2013, make: 'Hyundai', model: 'Accent GLS', color: 'Ironman Silver', price: 3995, mileage: 250.831, status: 'Available', description: 'Economical compact sedan.' },
    { id: '12345', year: 2013, make: 'Ford', model: 'E-350', color: 'White', price: 12995, mileage: 175, status: 'Available', description: 'Commercial cargo van.' },
    { id: '512136', year: 2013, make: 'Ford', model: 'Escape Titanium', color: 'Frosted Glass', price: 5995, mileage: 204.019, status: 'Available', description: 'Compact SUV with titanium trim.' },
    { id: '603-158', year: 2013, make: 'Subaru', model: 'Crosstrek Premium', color: 'Gray', price: 6995, mileage: 227.658, status: 'Available', description: 'All-wheel drive crossover for any terrain.' },
    { id: 'S1', year: 2013, make: 'Ford', model: 'Escape', color: 'Grey', price: 5995, mileage: 216.125, status: 'Available', description: 'Reliable compact SUV.' },
    { id: '410063', year: 2013, make: 'BMW', model: 'X1', color: 'Alpine White', price: 9995, mileage: 112, status: 'Available', description: 'Compact luxury SUV with advanced features.' },
    { id: '603-157', year: 2012, make: 'Hyundai', model: 'Elantra GLS', color: 'Gray', price: 3995, mileage: 203.451, status: 'Available', description: 'Budget-friendly sedan.' },
    { id: '602-152', year: 2012, make: 'Audi', model: 'Q5 2.0L Premium', color: 'Blue', price: 7995, mileage: 251.125, status: 'Available', description: 'Premium compact crossover.' },
    { id: '601-147', year: 2012, make: 'Dodge', model: 'Avenger SE', color: 'Copperhead Pearl', price: 3995, mileage: 240.18, status: 'Available', description: 'Affordable mid-size sedan.' },
    { id: '511-129', year: 2012, make: 'Toyota', model: 'Tundra LTD', color: 'Spruce Mica', price: 17995, mileage: 139.505, status: 'Available', description: 'Full-size truck with luxury amenities.' },
    { id: '512-134', year: 2012, make: 'Subaru', model: 'Outback 2.5i Premium', color: 'Crystal Black', price: 6995, mileage: 235.685, status: 'Available', description: 'Wagon with all-wheel drive capability.' },
    { id: '511-132', year: 2011, make: 'Ram', model: '1500 Outdoorsman', color: 'Bright White', price: 9995, mileage: 201, status: 'Available', description: 'Heavy-duty pickup truck.' },
    { id: '509-119A', year: 2010, make: 'Ford', model: 'F-150 XLT', color: 'Gray', price: 8995, mileage: 232.125, status: 'Available', description: 'Legendary F-150 truck.' },
    { id: '602-149', year: 2010, make: 'Toyota', model: 'Tundra 4WD Truck', color: 'Black', price: 10995, mileage: 235.951, status: 'Available', description: 'Full-size 4WD truck for any job.' },
    { id: 'NO0984', year: 2006, make: 'Harley-Davidson', model: 'VRod', color: 'Red', price: 7995, mileage: 9.8, status: 'Available', description: 'Classic V-Rod motorcycle.' },
    { id: '0101', year: 2000, make: 'BMW', model: 'R1100RT', color: 'Green', price: 4900, mileage: 130, status: 'Available', description: 'Vintage BMW touring motorcycle.' },
    { id: '1324', year: 1986, make: 'Nissan', model: '300ZX', color: 'Red', price: 15000, mileage: 200, status: 'Available', description: 'Rare classic sports car.' },
    { id: '0202', year: 1970, make: 'Pedlon', model: 'Quadracycle', color: 'Blue', price: 1200, mileage: 0, status: 'Available', description: 'Vintage quadracycle.' },
  ];

  useEffect(() => {
    try {
      setLoading(false);
      setVehicles(allVehicles);
    } catch (err) {
      console.error('Error loading vehicles:', err);
      setVehicles(allVehicles);
      setLoading(false);
    }
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
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <span className="text-gray-600 text-sm font-semibold">Image coming soon</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-blue-600 text-xl font-bold mb-2">
                    ${vehicle.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {vehicle.mileage.toLocaleString()} km
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
