'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <button
                                onClick={() => router.push('/')}
                                className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                            >
                                MovieVerse
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => router.push('/')}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => router.push('/movies')}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Movies
                            </button>
                            <button
                                onClick={() => router.push('/categories')}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Categories
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            </div>
                        </div>

                        {/* User Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/favorites')}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Favorites
                            </button>
                            <button
                                onClick={() => router.push('/ticketBooking')}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                Book Tickets
                            </button>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        setIsLogin(true);
                                        setShowAuthModal(true);
                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        setIsLogin(false);
                                        setShowAuthModal(true);
                                    }}
                                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/95 border-t border-white/10">
                        <div className="px-4 py-3 space-y-3">
                            <button
                                onClick={() => {
                                    router.push('/');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/movies');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors"
                            >
                                Movies
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/categories');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors"
                            >
                                Categories
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/favorites');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors"
                            >
                                Favorites
                            </button>
                            <button
                                onClick={() => {
                                    router.push('/ticketBooking');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors"
                            >
                                Book Tickets
                            </button>
                            <div className="flex flex-col space-y-2 pt-2">
                                <button
                                    onClick={() => {
                                        setIsLogin(true);
                                        setShowAuthModal(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        setIsLogin(false);
                                        setShowAuthModal(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

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
                                    <input
                                        type="text"
                                        value={authForm.name}
                                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter your name"
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={authForm.email}
                                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={authForm.password}
                                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter your password"
                                    required
                                />
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
        </>
    );
};

export default Navbar;