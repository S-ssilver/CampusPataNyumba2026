
import { House } from './types';

export const houses: House[] = [
  {
    id: 1,
    title: "Spacious Bedsitter near KINAP",
    price: 8000,
    location: "Kirigiti, Kiambu",
    campus: "KINAP",
    type: "Bedsitter",
    distance: "1.2km from campus",
    available: "Immediately",
    amenities: ["Running Water", "24/7 Security", "Free WiFi", "Parking Space"],
    description: "Beautiful and spacious bedsitter located in a secure compound. Perfect for students with all necessary amenities included.",
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"
    ],
    whatsappNumber: "254711111111",
    landlordName: "Mr. Kamau",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Single Room - JKUAT Area",
    price: 5000,
    location: "Juja, Kiambu",
    campus: "JKUAT",
    type: "Single Room",
    distance: "0.8km from campus",
    available: "Next Week",
    amenities: ["Running Water", "Security", "Shared Kitchen", "Laundry Area"],
    description: "Cozy single room in a student-friendly apartment. Great location close to campus.",
    photos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800"
    ],
    whatsappNumber: "254722222222",
    landlordName: "Mama Njuguna",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Shared Room near KU",
    price: 3500,
    location: "Kahawa West, Nairobi",
    campus: "KU",
    type: "Shared Room",
    distance: "1.5km from campus",
    available: "Immediately",
    amenities: ["Running Water", "Free WiFi", "Study Area"],
    description: "Affordable shared accommodation perfect for budget-conscious students.",
    photos: [
      "https://images.unsplash.com/photo-1555854817-2b214be25070?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"
    ],
    whatsappNumber: "254733333333",
    landlordName: "Sarah M.",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Modern Bedsitter - Strathmore",
    price: 12000,
    location: "Madaraka, Nairobi",
    campus: "Strathmore",
    type: "Bedsitter",
    distance: "0.5km from campus",
    available: "1st Next Month",
    amenities: ["Running Water", "24/7 Security", "Gym Access"],
    description: "Luxury bedsitter in a modern apartment complex. Features high-end finishes.",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536376074432-cd21f796263b?auto=format&fit=crop&q=80&w=800"
    ],
    whatsappNumber: "254744444444",
    landlordName: "Kevin O.",
    createdAt: new Date().toISOString()
  }
];
