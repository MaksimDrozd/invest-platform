import { ArrowRight, Play, Star, Shield, TrendingUp, Users, ChevronRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { AuthService } from '../services/AuthService';

const LandingPage = () => {
  const navigate = useNavigate();
  const authService = container.get<AuthService>(TYPES.AuthService);
  const currentUser = authService.getCurrentUser();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  const handleGoToDashboard = () => {
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">manjam</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#why-manjam" className="text-gray-600 hover:text-emerald-600 transition-colors">Why Manjam?</a>
              <a href="#funds" className="text-gray-600 hover:text-emerald-600 transition-colors">Funds</a>
              <a href="#education" className="text-gray-600 hover:text-emerald-600 transition-colors">Education</a>
              <a href="#forum" className="text-gray-600 hover:text-emerald-600 transition-colors">Forum</a>
              <a href="#app-features" className="text-gray-600 hover:text-emerald-600 transition-colors">App features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-emerald-600 transition-colors">Testimonials</a>
            </nav>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-gray-600">Welcome, {currentUser.firstName}!</span>
                  <button 
                    onClick={handleGoToDashboard}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={handleSignUp}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The world's
            <br />
            <span className="text-emerald-600">first Sharia-compliant</span>
            <br />
            crypto investment platform
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Actively managed halal funds. Transparent. Ethical. Built for Muslims and investors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button 
              onClick={handleSignUp}
              className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Sign up</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Logout</span>
                    <div className="w-8 h-8 bg-emerald-100 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-left">
                    <p className="text-sm text-gray-500 mb-1">Portfolio summary</p>
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">$12,456.37</p>
                        <p className="text-sm text-emerald-600">+$234.89</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">Balanced</p>
                        <p className="text-sm text-emerald-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset allocation</h3>
                    <div className="w-48 h-48 mx-auto relative">
                      <div className="w-full h-full rounded-full border-8 border-emerald-200"></div>
                      <div className="absolute inset-0 w-full h-full rounded-full border-8 border-emerald-600 border-r-transparent border-b-transparent transform rotate-45"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance chart</h3>
                    <div className="h-48 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-lg flex items-end justify-between p-4">
                      <div className="w-full h-32 bg-gradient-to-t from-emerald-400 to-emerald-200 rounded opacity-70"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Manjam Section */}
      <section id="why-manjam" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Manjam?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Actively managed halal portfolios</h3>
              <p className="text-gray-600">Expert curation ensures your investments remain Sharia-compliant</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Diversification & transparency</h3>
              <p className="text-gray-600">Clear insights into fund composition and performance metrics</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal & group portfolios</h3>
              <p className="text-gray-600">Invest individually or create group investments with family and friends</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration with trusted partners</h3>
              <p className="text-gray-600">Seamless connections with established financial institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Types Section */}
      <section id="funds" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fund types</h2>
            <p className="text-xl text-gray-600">Choose the investment strategy that fits your goals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                <span className="font-semibold text-emerald-600">Open Fund</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Classic Fund</h3>
              <p className="text-gray-600 mb-6">
                Start with our classic investment funds based on major reference 
                blockchain protocols including the fund to choose their key asset 
                for long investment.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Sharia-compliant assets</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Diversified portfolio</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Expertly managed portfolios</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <Star className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">Sustainable returns</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">More fund types coming soon</h3>
                <p className="text-gray-600 mb-6">
                  We're developing additional investment options to serve your growing portfolio needs.
                </p>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                  Get notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Walkthroughs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Video walkthroughs</h2>
            <p className="text-gray-600">See manjam in action</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Getting started with Manjam", duration: "2 min" },
              { title: "How to use the Dashboard", duration: "4 min" },
              { title: "Research, analysis & fund understanding", duration: "3 min" },
              { title: "Understanding managed portfolios", duration: "5 min" }
            ].map((video, index) => (
              <div key={index} className="bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-emerald-200 to-teal-200 flex items-center justify-center">
                  <Play className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-16 h-16 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A community that invests with purpose
              </h2>
              
              <p className="text-gray-600 mb-8">
                Learn, discuss, share regularly
              </p>

              <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Join 10k+ Muslim community</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Weekly live Q&A with Sharia experts</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Educational content weekly</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Weekly market sentiment updates</span>
                </div>
              </div>

              <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                Join forum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Features Section */}
      <section id="app-features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for simplicity</h2>
            <p className="text-gray-600">Manjam makes halal investing simple and transparent—whether you're new to investing or a seasoned investor looking for better returns and impact.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Actively managed halal portfolios</h3>
                  <p className="text-gray-600">Our expert team ensures all investments remain Sharia-compliant while maximizing returns.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fund & crypto deposits</h3>
                  <p className="text-gray-600">Easily deposit funds and crypto assets with seamless integration.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Live portfolio tracking</h3>
                  <p className="text-gray-600">Monitor your investments in real-time with detailed analytics and performance metrics.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart alerts</h3>
                  <p className="text-gray-600">Stay informed with intelligent notifications about market changes and portfolio performance.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
                <div className="bg-emerald-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Welcome back!</h3>
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Portfolio Value</span>
                        <span className="text-lg font-bold">$12,456</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Today's Change</span>
                        <span className="text-sm text-emerald-200">+$234 (+1.92%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <span className="text-white">Asset allocation</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <span className="text-white">Performance chart</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Your halal investment journey starts here
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <a href="#" className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            
            <a href="#" className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Download className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">manjam</span>
              </div>
              <p className="text-gray-400">
                The world's first Sharia-compliant crypto investment platform
              </p>
              {/* Development helper - remove in production */}
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="mt-4 text-xs text-gray-500 hover:text-gray-300 underline"
              >
                Clear Session (Dev)
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Why Manjam?</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Funds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Education</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">App features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Manjam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 