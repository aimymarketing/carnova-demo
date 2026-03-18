'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const MOCK_VEHICLES = {
  '1': {
    id: '1',
    year: 2023,
    make: 'Toyota',
    model: 'Camry',
    price: 28500,
    mileage: 15000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  '2': {
    id: '2',
    year: 2022,
    make: 'Honda',
    model: 'Accord',
    price: 26900,
    mileage: 25000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  '3': {
    id: '3',
    year: 2023,
    make: 'Ford',
    model: 'F-150',
    price: 42000,
    mileage: 10000,
    image: '/placeholder.jpg',
    status: 'Available'
  },
  '4': {
    id: '4',
    year: 2021,
    make: 'Chevrolet',
    model: 'Silverado',
    price: 38500,
    mileage: 35000,
    image: '/placeholder.jpg',
    status: 'Sold'
  },
  '5': {
    id: '5',
    year: 2022,
    make: 'BMW',
    model: '3 Series',
    price: 35800,
    mileage: 20000,
    image: '/placeholder.jpg',
    status: 'Available'
  }
};

export default function VehicleDetailPage({ params }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = MOCK_VEHICLES[params.id];
    setVehicle(data || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading vehicle details...</p>
        </div>
      </main>
    );
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
          <Link
            href="/inventory"
            className="text-blue-600 hover:underline"
          >
            Back to Inventory
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/inventory"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Inventory
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-96 object-cover bg-gray-300"
            />
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-white font-bold text-lg ${
              vehicle.status === 'Available' ? 'bg-green-500' :
              vehicle.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              {vehicle.status}
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl text-blue-600 font-bold mb-2">
                  ${vehicle.price.toLocaleString()}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Mileage: {vehicle.mileage.toLocaleString()} miles
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Year</p>
                  <p className="font-bold">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-gray-600">Make</p>
                  <p className="font-bold">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-gray-600">Model</p>
                  <p className="font-bold">{vehicle.model}</p>
                </div>
              </div>
            </div>
            {vehicle.status === 'Available' && (
              <div className="border-t pt-6">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                  Request More Information
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
