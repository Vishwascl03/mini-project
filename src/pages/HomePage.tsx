import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCanvasStore } from '../store/canvasStore';
import { useAuthStore } from '../store/authStore';
import CanvasCard from '../components/Home/CanvasCard';
import CreateCanvasCard from '../components/Home/CreateCanvasCard';
import { Palette, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const { canvases, fetchCanvases } = useCanvasStore();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    fetchCanvases();
  }, [fetchCanvases]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <section className="mb-12">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Create Together, <span className="text-pink-300">Anywhere</span>
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                Artistry is a collaborative platform where artists can create, share, and get inspired. Draw together in real-time and bring your ideas to life.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/canvas/new"
                  className="btn bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-lg shadow-md flex items-center"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Start Creating
                </Link>
                <Link
                  to="/explore"
                  className="btn bg-indigo-700 text-white hover:bg-indigo-800 font-bold py-3 px-6 rounded-lg shadow-md flex items-center"
                >
                  Explore Artworks
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Collaborative Art"
                className="rounded-lg shadow-2xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {isAuthenticated ? (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Canvases</h2>
            <Link
              to="/canvas/new"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CreateCanvasCard />
            {canvases.map((canvas) => (
              <CanvasCard key={canvas.id} canvas={canvas} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to start creating</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of artists and creators to start your collaborative journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="btn btn-outline py-2 px-6"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn btn-primary py-2 px-6"
            >
              Create Account
            </Link>
          </div>
        </section>
      )}
      
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-indigo-600">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create a Canvas</h3>
            <p className="text-gray-600">
              Start with a blank canvas or choose from our templates to begin your artistic journey.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-indigo-600">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Invite Collaborators</h3>
            <p className="text-gray-600">
              Share your canvas with friends or colleagues and create together in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-indigo-600">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Get AI Suggestions</h3>
            <p className="text-gray-600">
              Stuck? Our AI can provide creative suggestions to inspire your next artistic move.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;