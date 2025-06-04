'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaFacebook, FaHeart, FaInstagram, FaLock, FaPlay, FaSearch, FaStar, FaTimes, FaTwitter, FaUser, FaYoutube } from 'react-icons/fa';

interface Movie {
    id: number;
    title: string;
    genre: string;
    rating: number;
    year: number;
    duration: string;
    description: string;
    image: string;
    isFavorite: boolean;
}

export default function Home() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [authForm, setAuthForm] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthError(null);

        try {
            if (isLogin) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setShowAuthModal(false);
                router.push('/dashboard');
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLogin(true);
                setAuthError('Registration successful! Please login.');
            }
        } catch (err) {
            setAuthError(isLogin ? 'Invalid credentials' : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const featuredMovies: Movie[] = [
        {
            id: 1,
            title: "Shadow Strike",
            genre: "Action/Thriller",
            rating: 4.9,
            year: 2024,
            duration: "2h 20m",
            description: "A covert operative must prevent a global catastrophe while being hunted by an elite assassin squad.",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
            isFavorite: false
        },
        {
            id: 2,
            title: "Eternal Echoes",
            genre: "Drama/Sci-Fi",
            rating: 4.7,
            year: 2024,
            duration: "2h 15m",
            description: "A scientist discovers a way to communicate with parallel universes, leading to unexpected consequences.",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
            isFavorite: false
        },
        {
            id: 3,
            title: "Midnight Riders",
            genre: "Action/Adventure",
            rating: 4.8,
            year: 2024,
            duration: "2h 30m",
            description: "A group of elite motorcycle racers must outrun a mysterious organization that wants their technology.",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
            isFavorite: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                MovieVerse
                            </h1>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                                />
                                <FaSearch className="absolute left-3 top-3 text-white/50" />
                            </div>
                            <button
                                onClick={() => {
                                    setIsLogin(true);
                                    setShowAuthModal(true);
                                }}
                                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition-colors"
                            >
                                Sign In
                            </button>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white/80 hover:text-white"
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                </div>

                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl lg:px-20">
                        <div className="max-w-2xl">
                            <h1 className="text-6xl md:text-7xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Unlimited
                                </span>
                                <br />
                                Entertainment
                            </h1>
                            <p className="text-xl text-white/80 mb-8">
                                Stream your favorite movies and TV shows in stunning quality.
                                Join millions of viewers worldwide.
                            </p>
                            <div className="flex space-x-4">
                                <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full flex items-center space-x-2 transition-colors cursor-pointer"
                                    onClick={() => router.push("/home")}
                                >
                                    <FaPlay />
                                    <span>Start Watching</span>
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full flex items-center space-x-2 transition-colors">
                                    <FaHeart />
                                    <span>My List</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Movies */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Featured Movies
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="aspect-[16/9] relative">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-full flex items-center justify-center space-x-2 transition-colors">
                                            <FaPlay />
                                            <span>Watch Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                                    <div className="flex items-center bg-white/10 px-2 py-1 rounded-full">
                                        <FaStar className="text-yellow-400 mr-1" />
                                        <span>{movie.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-white/60 text-sm mb-4">
                                    <span>{movie.year}</span>
                                    <span className="mx-2">•</span>
                                    <span>{movie.duration}</span>
                                    <span className="mx-2">•</span>
                                    <span>{movie.genre}</span>
                                </div>
                                <p className="text-white/80 text-sm leading-relaxed">{movie.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Auth Modal */}
            {showAuthModal && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={() => setShowAuthModal(false)}
                >
                    <div
                        className="bg-white/10 backdrop-blur-lg rounded-2xl w-full max-w-md p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-white/60">
                                {isLogin ? 'Sign in to continue watching' : 'Join us to start watching'}
                            </p>
                        </div>

                        {authError && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-500 text-sm">{authError}</p>
                            </div>
                        )}

                        <form onSubmit={handleAuthSubmit} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <FaUser className="text-white/40" />
                                        </div>
                                        <input
                                            type="text"
                                            value={authForm.name}
                                            onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Enter your name"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <FaUser className="text-white/40" />
                                    </div>
                                    <input
                                        type="email"
                                        value={authForm.email}
                                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <FaLock className="text-white/40" />
                                    </div>
                                    <input
                                        type="password"
                                        value={authForm.password}
                                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                        {isLogin ? 'Signing in...' : 'Creating account...'}
                                    </div>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-white/60">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setAuthError(null);
                                    }}
                                    className="text-purple-500 hover:text-purple-400"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                MovieVerse
                            </h3>
                            <p className="text-white/60">
                                Your ultimate destination for unlimited entertainment.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-white/60 hover:text-white transition-colors">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="text-white/60 hover:text-white transition-colors">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="text-white/60 hover:text-white transition-colors">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="text-white/60 hover:text-white transition-colors">
                                    <FaYoutube size={20} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Movies</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">TV Shows</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">My List</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                            <p className="text-white/60 mb-4">
                                Subscribe to our newsletter for the latest updates and offers.
                            </p>
                            <form className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
                        <p>&copy; {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}