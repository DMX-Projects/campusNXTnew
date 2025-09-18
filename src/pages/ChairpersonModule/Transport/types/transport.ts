export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'idle';
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
  driver?: Driver;
  route?: Route;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  experience: number;
  rating: number;
  status: 'active' | 'on-leave' | 'training';
  certifications: string[];
  assignedVehicle?: string;
  assignedRoute?: string;
}

export interface Route {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  distance: number;
  stops: RouteStop[];
  assignedStudents: number;
  status: 'active' | 'delayed' | 'completed';
  driverId?: string;
  vehicleId?: string;
}

export interface RouteStop {
  id: string;
  name: string;
  address: string;
  time: string;
  students: number;
  coordinates: { lat: number; lng: number };
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  routeId: string;
  stopId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  specialNeeds?: string;
  status: 'active' | 'inactive';
}

export interface Expense {
  id: string;
  type: 'fuel' | 'maintenance' | 'salary' | 'insurance' | 'other';
  amount: number;
  date: string;
  description: string;
  vehicleId?: string;
  driverId?: string;
}

export interface Incident {
  id: string;
  type: 'accident' | 'breakdown' | 'delay' | 'safety' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  date: string;
  vehicleId?: string;
  driverId?: string;
  routeId?: string;
  status: 'open' | 'investigating' | 'resolved';
}