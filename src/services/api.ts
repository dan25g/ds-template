import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API gateway URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(config => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to parse auth data', error);
    }
  }
  return config;
});

// Mock data for development
const mockAuctions = [
  {
    id: '1',
    title: 'Vintage Camera Collection',
    description: 'A collection of 5 vintage cameras from the 1950s in excellent condition.',
    startingPrice: 500,
    currentBid: 750,
    imageUrl: 'https://images.pexels.com/photos/821738/pexels-photo-821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: '101',
      name: 'VintageCollector'
    },
    bids: [
      { id: 'b1', auctionId: '1', userId: '201', userName: 'PhotoEnthusiast', amount: 650, date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: 'b2', auctionId: '1', userId: '202', userName: 'RetroLover', amount: 750, date: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
    ],
    categories: ['Photography', 'Vintage', 'Collectibles']
  },
  {
    id: '2',
    title: 'Modern Art Painting',
    description: 'Original abstract painting by emerging artist J. Smith, acrylic on canvas, 30x40 inches.',
    startingPrice: 1200,
    currentBid: 1500,
    imageUrl: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: '102',
      name: 'ArtGallery123'
    },
    bids: [
      { id: 'b3', auctionId: '2', userId: '203', userName: 'ArtCollector', amount: 1350, date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: 'b4', auctionId: '2', userId: '204', userName: 'HomeDesigner', amount: 1500, date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
    ],
    categories: ['Art', 'Modern', 'Painting']
  },
  {
    id: '3',
    title: 'Antique Wooden Desk',
    description: 'Beautiful mahogany desk from the late 19th century. Well-preserved with original hardware.',
    startingPrice: 800,
    currentBid: 950,
    imageUrl: 'https://images.pexels.com/photos/5417664/pexels-photo-5417664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: '103',
      name: 'AntiqueTrader'
    },
    bids: [
      { id: 'b5', auctionId: '3', userId: '205', userName: 'VintageFinder', amount: 850, date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
      { id: 'b6', auctionId: '3', userId: '206', userName: 'ClassicDesign', amount: 950, date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() }
    ],
    categories: ['Furniture', 'Antique', 'Wood']
  },
  {
    id: '4',
    title: 'Limited Edition Watch',
    description: 'Luxury watch, limited edition of 500 pieces worldwide, automatic movement, sapphire crystal.',
    startingPrice: 3000,
    currentBid: 3450,
    imageUrl: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      id: '104',
      name: 'LuxuryItems'
    },
    bids: [
      { id: 'b7', auctionId: '4', userId: '207', userName: 'TimeCollector', amount: 3200, date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() },
      { id: 'b8', auctionId: '4', userId: '208', userName: 'EleganceSeeker', amount: 3450, date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() }
    ],
    categories: ['Watches', 'Luxury', 'Accessories']
  }
];

// API service functions

// Auctions
export const getAuctions = async () => {
  try {
    // For development, return mock data
    // In production, uncomment the axios call
    // const response = await api.get('/auctions');
    // return response.data;
    
    return { data: mockAuctions };
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
};

export const getAuctionById = async (id: string) => {
  try {
    // For development, return mock data
    // const response = await api.get(`/auctions/${id}`);
    // return response.data;
    
    const auction = mockAuctions.find(a => a.id === id);
    return { data: auction };
  } catch (error) {
    console.error(`Error fetching auction ${id}:`, error);
    throw error;
  }
};

export const placeBid = async (auctionId: string, amount: number) => {
  try {
    // In production, this would be:
    // const response = await api.post(`/auctions/${auctionId}/bids`, { amount });
    // return response.data;
    
    // For development, simulate a successful bid
    const auction = mockAuctions.find(a => a.id === auctionId);
    if (auction && amount > auction.currentBid) {
      auction.currentBid = amount;
      const authData = localStorage.getItem('auth');
      let userId = '999';
      let userName = 'CurrentUser';
      
      if (authData) {
        try {
          const { user } = JSON.parse(authData);
          userId = user.id;
          userName = user.name;
        } catch (e) {
          console.error('Failed to parse auth data', e);
        }
      }
      
      const newBid = {
        id: `b${Date.now()}`,
        auctionId,
        userId,
        userName,
        amount,
        date: new Date().toISOString()
      };
      
      auction.bids.push(newBid);
      
      return { 
        success: true, 
        data: auction 
      };
    }
    
    return { 
      success: false, 
      error: 'Bid must be higher than current bid' 
    };
  } catch (error) {
    console.error(`Error placing bid on auction ${auctionId}:`, error);
    throw error;
  }
};

// Auth APIs would be implemented here in a real application
// Since we're handling auth in the AuthContext, these are placeholders

export default api;