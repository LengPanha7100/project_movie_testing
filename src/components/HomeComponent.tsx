'use client';
import { BookingResponse, CategoryResponse, Movie, MovieResponse } from '@/types/Movie';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import {
    FaBars,
    FaChevronLeft,
    FaChevronRight,
    FaHeart,
    FaPlay,
    FaRegHeart,
    FaSearch,
    FaStar,
    FaTicketAlt,
    FaTimes
} from 'react-icons/fa';

interface LandingPageProps {
    responseMovieAll: MovieResponse;
    responseCategory: CategoryResponse;
    responseBooking: BookingResponse;
}

const HomeComponent: React.FC<LandingPageProps> = ({ responseMovieAll, responseCategory, responseBooking }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingCountParam = searchParams.get('bookingCount');
    const bookingCount = bookingCountParam ? Number(bookingCountParam) : 0;

    const handleCategoryClick = (name: string) => {
        const path = name.toLowerCase().replace(/\s+/g, '-');
        router.push(`/${path}`);
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    const [movieList, setMovieList] = useState<Movie[]>(responseMovieAll.payload);
    const handleOnClick = (movieId: number) => {
        setMovieList((prevList) =>
            prevList.map((movie) =>
                movie.movieId === movieId
                    ? { ...movie, isFavorite: !movie.isFavorite }
                    : movie
            )
        );
    };

    const filteredMovies = movieList.filter((movie) =>
        movie?.category?.name &&
        movie?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
        <div
            onClick={() => router.push(`/detail/${movie.movieId}`)}
            className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            <div className="relative">
                <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
                <button
                    className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full duration-200 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleOnClick(movie.movieId)
                    }}
                >
                    {movie.isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
                </button>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                    <div className="flex items-center bg-gray-700/50 px-2 py-1 rounded">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-white">{movie.rating}</span>
                    </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                    <span>{movie.year}</span>
                    <span className="mx-2">•</span>
                    <span>{movie.duration}</span>
                    <span className="mx-2">•</span>
                    {/* <span>{movie.genre}</span> */}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{movie.overview}</p>
            </div>
        </div>
    );
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

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <div>
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


                            {/* Search Bar */}
                            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                            </div>

                            {/* User Actions */}
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
            </div>

            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">

                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            The Last Adventure
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            An epic journey through uncharted territories where danger and discovery await at every turn.
                        </p>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-200"
                                onClick={() => router.push('/watch')}
                            >
                                <FaPlay className="mr-2" />
                                Watch Now
                            </button>
                            <button
                                className="flex items-center px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg transform hover:scale-105 transition-all duration-200"
                                onClick={() => router.push('/favorithes')}
                            >
                                <FaHeart className="mr-2" />
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold mb-6 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Featured Movies
                    </h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                            />
                            <FaSearch className="absolute right-4 top-3.5 text-gray-400" />
                        </div>
                        {/* <button className="flex items-center px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <FaFilter className="mr-2" />
                            Filter
                        </button> */}

                        <button className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer duration-200"
                            onClick={() => router.push('/titketBooking')}>
                            <FaTicketAlt className="mr-2" />
                            Book Now {responseBooking.payload.length}
                        </button>
                    </div>
                </div>

                {/* Movie Grid */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {searchQuery.trim() === "" ? (
                            // No search query — show all movies or filteredMovies as default
                            filteredMovies
                                ?.filter((movie) => movie?.rating > 9)
                                .map((movie) => (
                                    <MovieCard key={movie?.movieId} movie={movie} />
                                ))
                        ) : filteredMovies?.length > 0 ? (
                            // Search query present & has results
                            filteredMovies?.map((movie) => (
                                <MovieCard key={movie?.movieId} movie={movie} />
                            ))
                        ) : (
                            // Search query present but no results
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <FaSearch className="w-8 h-8 text-white/20" />
                                </div>
                                <p className="text-xl text-white/40 font-medium">No movies found matching your search.</p>
                            </div>
                        )}
                    </div>

                    {/* Show Featured + All Movies only if search query is empty */}
                    {searchQuery.trim() === "" && (
                        <>
                            {/* All Movies heading */}
                            <h2 className="text-3xl font-bold mb-6 md:m-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                All Movies
                            </h2>

                            {/* Horizontal scrolling movie list */}
                            <div className="relative overflow-hidden">
                                {/* Previous button */}
                                <button
                                    onClick={() => scroll("left")}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-r-lg transition-all duration-200 backdrop-blur-sm cursor-pointer"
                                >
                                    <FaChevronLeft size={24} />
                                </button>

                                {/* Next button */}
                                <button
                                    onClick={() => scroll("right")}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-l-lg transition-all duration-200 backdrop-blur-sm cu"
                                >
                                    <FaChevronRight size={24} />
                                </button>

                                <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                                    <div className="flex space-x-6 pb-8 auto-scroll">
                                        {movieList.map((movie) => (
                                            <div
                                                key={movie.movieId}
                                                onClick={() => router.push(`/detail/${movie.movieId}`)}
                                                className="flex-none w-[300px] group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                            >
                                                <div className="relative">
                                                    <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
                                                    <button
                                                        className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full cursor-pointer transition-colors duration-200"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOnClick(movie.movieId);
                                                        }}
                                                    >
                                                        {movie.isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
                                                    </button>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="text-xl font-semibold">{movie.title}</h3>
                                                        <div className="flex items-center bg-gray-700/50 px-2 py-1 rounded">
                                                            <FaStar className="text-yellow-400 mr-1" />
                                                            <span>{movie.rating}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-400 text-sm mb-4">
                                                        <span>{movie.year}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{movie.duration}</span>
                                                        <span className="mx-2">•</span>
                                                        {/* <span>{movie.genre}</span> */}
                                                    </div>
                                                    <div>
                                                        <p className={`text-white/50 text-sm leading-relaxed ${showAll ? "" : "line-clamp-2"}`}>
                                                            {movie.overview}
                                                        </p>

                                                        {movie.overview.length > 100 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowAll(!showAll)
                                                                }
                                                                }
                                                                className="mt-2 text-blue-400 hover:underline text-sm"
                                                            >
                                                                {showAll ? "Show less" : "Show more"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Categories Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {responseCategory.payload.map((category) => (
                            <div
                                key={category.name}
                                onClick={() => { handleCategoryClick(category.name) }}
                                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/30 cursor-pointer transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{category.name}</span>
                                    {/* <span className="text-gray-400">{category.count}</span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default HomeComponent;