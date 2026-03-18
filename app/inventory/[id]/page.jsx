'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VehicleDetailPage({ params }) {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params;

  const getImageUrl = (make, model, year) => {
    const makeLower = make.toLowerCase().replace(/[^a-z0-9]/g, '');
    const seed = `${makeLower}${year}`;
    return `https://picsum.photos/seed/${seed}/1200/600`;
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        const found = data.find(v => v.id === id);
        setVehicle(found || null);
        setLoading(false);
        if (!found) {
          setError('Vehicle not found');
        }
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setLoading(false);
        setError('Failed to load vehicle details');
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <Link href="/inventory" className="text-blue-600 hover:underline mb-4 block">\u2190 Back to Inventory</Link>
        <p className="text-xl">Loading vehicle details...</p>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen p-8">
        <Link href="/inventory" className="text-blue-600 hover:underline mb-4 block">\u2190 Back to Inventory</Link>
        <p className="text-xl text-red-600">{error || 'Vehicle not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Link href="/inventory" className="text-blue-600 hover:underline mb-4 block">\u2190 Back to Inventory</Link>

      <img
        src={getImageUrl(vehicle.make, vehicle.model, vehicle.year)}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        className="w-full max-w-4xl h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        {vehicle.color} \u00B7 {(vehicle.km || 0).toLocaleString()} km
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        <div>
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-gray-500">Price</dt>
              <dd className="text-2xl font-bold text-green-600">${vehicle.price.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Year</dt>
              <dd>{vehicle.year}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Mileage</dt>
              <dd>{(vehicle.km || 0).toLocaleString()} km</dd>
            </div>
            <div>
              <dt className="text-gray-500">Color</dt>
              <dd>{vehicle.color}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd className={`font-semibold ${vehicle.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'}`}>
                {vehicle.status}
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-gray-500">Make</dt>
              <dd>{vehicle.make}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Model</dt>
              <dd>{vehicle.model}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Year</dt>
              <dd>{vehicle.year}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Stock #</dt>
              <dd>{vehicle.id}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8 max-w-4xl">
        <p className="text-lg">
          <a href="tel:+19025551234" className="text-blue-600 hover:underline">Call for More Info</a>
          {' | '}
          <Link href="/inventory" className="text-blue-600 hover:underline">View All Inventory</Link>
        </p>
      </div>
    </div>
  );
}
