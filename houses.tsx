
import { House } from './types';
import house1 from "./assets/images/kirigiti1.jpg";
import house2 from "./assets/images/kirigiti2.jpg";
import house3 from "./assets/images/KU1.jpg";
import house4 from "./assets/images/KU2.jpg";
import house5 from "./assets/images/Strathmore1.jpg";
import house6 from "./assets/images/Strathmore2.jpg";
import house7 from "./assets/images/KU3.jpg";
import house8 from "./assets/images/KU4.jpg";
import house9 from "./assets/images/KU5.jpg";
import house10 from "./assets/images/UON1.jpg";
import house11 from "./assets/images/UON2.jpg";
import house12 from "./assets/images/UON3.jpg";


export const houses: House[] = [
  {
    id: 1,
    title: "Spacious Bedsitter near KINAP",
    price: 8000,
    location: "Kirigiti, Kiambu",
    campus: "KINAP",
    type: "Bedsitter",
    distance: "0.3km from campus",
    available: "Immediately",
    amenities: ["Running Water", "24/7 Security", "Free WiFi"],
    description: "Beautiful and spacious bedsitter located in a secure compound. Perfect for students with all necessary amenities included.",
    photos: [house1, house2
    ],
  
      
    whatsappNumber: "254720689017",
    landlordName: "Mrs. Eunice",
    mapLink: "https://maps.app.goo.gl/Dvtdf6GEvwXfpZrB9",
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
    available: "Next Month",
    amenities: ["Running Water", "Security", "Shared Kitchen", "Laundry Area"],
    description: "Cozy single room in a student-friendly apartment. Great location close to campus.",
    photos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800"
    ],
    whatsappNumber: "254722439653",
    landlordName: "Mr Dan",
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
    photos: [house3, house4
    ],
    whatsappNumber: "254712345678",
    landlordName: "Sarah Muthoni.",
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
    photos: [house5,house6
    ],
    whatsappNumber: "254744444444",
    landlordName: "Kevin O.",
    createdAt: new Date().toISOString()
  },
  {
  id: 5,
  title: "Modern Bedsitter near KU",
  price: 9500,
  location: "Kahawa West, Nairobi",
  campus: "KU",
  type: "Bedsitter",
  distance: "500m from campus",
  available: "Immediately",
  amenities: [
    "WiFi",
    "Parking",
    "24/7 Security"
  ],
  description:
    "Modern student apartment near KU with spacious rooms and reliable water.",
  photos: [house7,house8,house9
  ],
  whatsappNumber: "254700000000",
  landlordName: "Nonchalant Gitau",
  createdAt: new Date().toISOString()
},
{
  id: 6,
  title: "Affordable Studio near UON",
  price: 12000,
  location: "Ngara, Nairobi",
  campus: "UON",
  type: "Studio Apartment",
  distance: "10 minutes from campus",
  available: "Immediately",
  amenities: [
    "Free WiFi",
    "24/7 Security",
    "Water Included",
    "Parking",
    "Study Area"
  ],
  description:
    "Modern and affordable studio apartment ideal for University of Nairobi students. Located in a secure area with easy access to campus and public transport.",
  photos: [house10,house11,house12
    ],
  whatsappNumber: "254712345678",
  landlordName: "Mrs. Atieno",
  createdAt: new Date().toISOString()
},
];
