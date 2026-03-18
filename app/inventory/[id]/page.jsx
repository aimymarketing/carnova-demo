'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VehicleDetailPage({ params }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  const allVehicles = [
    { id: '0101', year: 2000, make: 'BMW', model: 'R1100RT', color: 'Green', price: 130000, mileage: 0, image: '/cars/bmw-r1100rt.jpg', status: 'Available', description: 'Classic BMW motorcycle in excellent condition.' },
    { id: '1324', year: 1986, make: 'Nissan', model: '300ZX', color: 'Red', price: 200000, mileage: 0, image: '/cars/nissan-300zx.jpg', status: 'Available', description: 'Rare classic sports car with original features.' },
    { id: '0202', year: 1970, make: 'Fetion', model: 'Quadracycle', color: 'Blue', price: 0, mileage: 0, image: '/cars/fetion-quadracycle.jpg', status: 'Available', description: 'Vintage quadracycle in working condition.' },
    { id: '602-150', year: 2016, make: 'Volkswagen', model: 'Golf TSI S', color: 'Pure White', price: 288101, mileage: 288.101, image: '/cars/vw-golf.jpg', status: 'Available', description: 'Well-maintained VW Golf with low mileage.' },
    { id: '602-155A', year: 2016, make: 'Honda', model: 'Civic LX', color: 'Lunar Silver Metallic', price: 105788, mileage: 105.788, image: '/cars/honda-civic.jpg', status: 'Available', description: 'Reliable Honda Civic with excellent fuel efficiency.' },
    { id: '509-119', year: 2013, make: 'Jeep', model: 'Patriot', color: 'Black', price: 232000, mileage: 232, image: '/cars/jeep-patriot.jpg', status: 'Available', description: 'Rugged Jeep Patriot ready for adventures.' },
    { id: '511-131', year: 2013, make: 'Nissan', model: 'Pathfinder SV', color: 'Super Black', price: 182145, mileage: 182.145, image: '/cars/nissan-pathfinder.jpg', status: 'Available', description: 'Spacious SUV perfect for families.' },
    { id: '601-144', year: 2013, make: 'Kia', model: 'Forte EX', color: 'Gunmetal Grey Pearl', price: 240125, mileage: 240.125, image: '/cars/kia-forte.jpg', status: 'Available', description: 'Stylish Kia Forte with modern features.' },
  ];

  useEffect(() => {
    try {
      const found = allVehicles.find(v => v.id === id);
      if (found) {
        setVehicle(found);
        setError(null);
      } else {
        setError('Vehicle not found');
      }
    } catch (err) {
      setError('Error loading vehicle details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="py-8 px-4 md:px-8">
          <p className="text-gray-600">Loading...</p>
        </section>
      </main>
    );
  }

  if (error || !vehicle) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="py-8 px-4 md:px-8">
          <Link href="/inventory" className="text-blue-600 hover:underline mb-8 block">
            ← Back to Inventory
          </Link>
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error || 'Vehicle not found'}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-8 px-4 md:px-8">
        {/* Back Button */}
        <Link href="/inventory" className="text-blue-600 hover:underline mb-8 block">
          ← Back to Inventory
        </Link>

        {/* Vehicle Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div>
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-car.jpg';
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-600 mb-6">{vehicle.description}</p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  {vehicle.price === 0 ? 'Contact for Price' : `$${vehicle.price.toLocaleString()}`}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Year</p>
                  <p className="text-2xl font-bold">{vehicle.year}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Mileage</p>
                  <p className="text-2xl font-bold">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Color</p>
                  <p className="text-2xl font-bold">{vehicle.color}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="text-2xl font-bold text-green-600">{vehicle.status}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                  Request More Information
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300">
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 font-semibold">Make</p>
              <p className="text-lg">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Model</p>
              <p className="text-lg">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Year</p>
              <p className="text-lg">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Color</p>
              <p className="text-lg">{vehicle.color}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
