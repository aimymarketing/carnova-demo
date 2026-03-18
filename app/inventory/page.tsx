'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  image: string;
  status: 'Available' | 'Sold' | 'Pending';
}

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    year: 2023,
    make: 'Toyota',
    model: 'Camry',
    price: 28500,
    mileage: 15000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  {
    id: '2',
    year: 2022,
    make: 'Honda',
    model: 'Accord',
    price: 26900,
    mileage: 25000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  {
    id: '3',
    year: 2023,
    make: 'Ford',
    model: 'F-150',
    price: 42000,
    mileage: 10000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  {
    id: '4',
    year: 2021,
    make: 'Chevrolet',
    model: 'Silverado',
    price: 38500,
    mileage: 35000,
    image: '/placeholder.jpg',
    status: 'Sold'
  },
  {
    id: '5',
    year: 2022,
    make: 'BMW',
    model: '3 Series',
    price: 35800,
    mileage: 20000,
    image: '/placeholder.jpg',
    status: 'Available'
  }
];

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setVehicles(MOCK_VEHICLES);
  }, []);

  const filteredVehicles = filter === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.status === filter);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-2">Vehicle Inventory</h1>
        <p className="text-gray-600 mb-6">Browse our pre-owned vehicles</p>

        <div className="mb-6 flex gap-2">
          {['All', 'Available', 'Sold'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded font-medium ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <Link
              key={vehicle.id}
              href={`/inventory/${vehicle.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-48 object-cover bg-gray-300"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded text-white text-sm font-medium ${
                  vehicle.status === 'Available' ? 'bg-green-500' :
                  vehicle.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'
                }`}>
                  {vehicle.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-blue-600 text-xl font-bold mb-2">
                  ${vehicle.price.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">
                  {vehicle.mileage.toLocaleString()} miles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
