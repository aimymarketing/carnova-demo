export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  mileage: number;
  image: string;
  status: 'Available' | 'Sold' | 'Pending';
}

export const VEHICLES: Vehicle[] = [
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

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find(v => v.id === id);
}

export function getAllVehicles(): Vehicle[] {
  return VEHICLES;
}

export function getAvailableVehicles(): Vehicle[] {
  return VEHICLES.filter(v => v.status === 'Available');
}

export function searchVehicles(query: string): Vehicle[] {
  const q = query.toLowerCase();
  return VEHICLES.filter(v => 
    v.make.toLowerCase().includes(q) ||
    v.model.toLowerCase().includes(q) ||
    v.year.toString().includes(q)
  );
}
