import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Clock, Award, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import AuctionCard from '../components/auctions/AuctionCard';
import { getAuctions } from '../services/api';
import { Auction } from '../types';

const HomePage: React.FC = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await getAuctions();
        // Get 4 auctions for the featured section
        setFeaturedAuctions(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setLoading(false);
      }
    };
    
    fetchAuctions();
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/3945638/pexels-photo-3945638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Unique Items at <span className="text-teal-400">Competitive Prices</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Join thousands of bidders on our secure auction platform. 
              Find collectibles, art, electronics, and more with new items added daily.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/auctions')}
                className="group"
              >
                Browse Auctions
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Bar Section */}
      <section className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for items..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Button variant="primary">
              Search
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Auctions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Check out these selected items with active bidding. Don't miss your chance to win!
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAuctions.map(auction => (
                  <AuctionCard key={auction.id} auction={auction} compact />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/auctions')}
                  className="group"
                >
                  View All Auctions
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose AuctionHub</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We provide a secure and user-friendly platform for buyers and sellers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full text-purple-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Bidding</h3>
              <p className="text-gray-600">
                Experience the excitement of live auctions with real-time updates and notifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Our platform ensures safe and secure transactions with buyer and seller protection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full text-amber-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All items are verified and sellers are rated to ensure the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Bidding?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of successful bidders and sellers on our platform. 
            Registration is free and only takes a minute.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Create an Account
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auctions')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              Browse Auctions
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;