'use client'
import { MovieService } from "@/service/MovieService";
import { Category, Movie, MovieRequest } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSearch, FaStar, FaTicketAlt, FaTimes, FaTrash } from "react-icons/fa";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [categoryData, setCategories] = useState<Category[]>([]);
    const handleCategories = async () => {
        try {
            const res = await MovieService.getCatgoryAll();
            if (res != null) {
                setCategories(res.payload);
            }
        } catch (error) {
            console.log("error data categories : ", error);
        }
    }

    useEffect(() => {
        handleCategories();
    }, [])

    console.log("data response categories : ", categoryData);

    const dataMovie = async () => {
        try {
            const responseMovie = await MovieService.getMovieAll();
            if (responseMovie && responseMovie.payload) {
                setMovieData(responseMovie.payload)
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    useEffect(() => {
        dataMovie();
    }, []);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newMovie, setNewMovie] = useState<MovieRequest>({
        title: "",
        year: new Date().getFullYear(),
        duration: 0,
        rating: 0,
        overview: "",
        directorName: "",
        poster: "",
        thriller: "",
        category: {
            categoryId: 0,
            name: ""
        },
        castMembers: []
    });

    const handleCreateMovie = async () => {
        const data1Movie: MovieRequest = {
            title: newMovie.title,
            year: newMovie.year,
            duration: newMovie.duration,
            rating: newMovie.rating,
            overview: newMovie.overview,
            directorName: newMovie.directorName,
            poster: newMovie.poster,
            thriller: newMovie.thriller,
            category: {
                categoryId: newMovie.category.categoryId,
                name: ""
            },
            castMembers: []
        }
        try {
            const response = await MovieService.createMovie(data1Movie);
            if (response) {
                setShowCreateModal(false);
                dataMovie();
                setNewMovie({
                    title: "",
                    year: new Date().getFullYear(),
                    duration: 0,
                    rating: 0,
                    overview: "",
                    directorName: "",
                    poster: "",
                    thriller: "",
                    category: {
                        categoryId: 0,
                        name: ""
                    },
                    castMembers: []
                });
            }
        } catch (error) {
            console.error("Error creating movie:", error);
        }
    };

    const filterDataMovie = movieData.filter((movie) =>
        movie.category.name &&
        movie.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [showAll, setShowAll] = useState(false);

    const toggleFavorite = (movieId: number) => {
        setMovieData((prevList) =>
            prevList.map((movie) =>
                movie.movieId === movieId
                    ? { ...movie, isFavorite: !movie.isFavorite }
                    : movie
            )
        );
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

    const handleDeleteMovie = async (movieId: number) => {
        // if (!confirm("Are you sure you want to delete this movie?")) return;
        if (!movieId) return;
        console.log("34", movieId);
        try {
            const res = await MovieService.removeMovie(movieId);
            if (res != null) {
                setMovieData((prev) => prev.filter((movie) => movie?.movieId !== movieId));

            } else {
                console.error("Failed to delete movie");
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };
    console.log("dagr34", movieToDelete?.movieId);


    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            {/* Content Container */}
            <div className="relative">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <div
                        className="inline-flex items-center mb-16 hover:opacity-80 transition-opacity cursor-pointer group"
                        onClick={() => router.push('/home')}
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </div>
                        <span className="text-lg text-white/80">Back to Home</span>
                    </div>

                    {/* Header Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            All Movies <span className="md:text-3xl">{"(" + filterDataMovie.length + ")"}</span>
                        </h1>

                        {/* Search and Filter Section */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-80 px-6 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
                                    focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20
                                    placeholder-white/40 transition-all duration-300"
                                />
                                <FaSearch className="absolute right-4 top-4 text-white/40" />
                            </div>

                            <button className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer duration-200"
                                onClick={() => setShowCreateModal(true)}
                            >
                                <FaTicketAlt className="mr-2" />
                                CREATE
                            </button>
                        </div>
                    </div>
                </div>

                {/* Create Movie Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#1a1a1a] rounded-2xl p-8 w-full max-w-2xl mx-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Create New Movie</h2>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={newMovie.title}
                                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Year</label>
                                        <input
                                            type="number"
                                            value={newMovie.year}
                                            onChange={(e) => setNewMovie({ ...newMovie, year: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                                        <input
                                            type="number"
                                            value={isNaN(newMovie.duration) ? '' : newMovie.duration}
                                            onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value === '' ? 0 : Number(e.target.value) })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Rating</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={newMovie.rating}
                                            onChange={(e) => setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Overview</label>
                                    <textarea
                                        value={newMovie.overview}
                                        onChange={(e) => setNewMovie({ ...newMovie, overview: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 h-24"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Director Name</label>
                                        <input
                                            type="text"
                                            value={newMovie.directorName}
                                            onChange={(e) => setNewMovie({ ...newMovie, directorName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Poster URL</label>
                                        <input
                                            type="text"
                                            value={newMovie.poster}
                                            onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Thriller URL</label>
                                    <input
                                        type="text"
                                        value={newMovie.thriller}
                                        onChange={(e) => setNewMovie({ ...newMovie, thriller: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <div className="relative">
                                        <select
                                            value={newMovie.category.categoryId}
                                            onChange={(e) => {
                                                const selectedCategory = categoryData.find(
                                                    cat => cat.categoryId === parseInt(e.target.value)
                                                );
                                                setNewMovie({
                                                    ...newMovie,
                                                    category: {
                                                        categoryId: parseInt(e.target.value),
                                                        name: selectedCategory?.name || ""
                                                    }
                                                });
                                            }}
                                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
                                            focus:outline-none focus:border-white/20 appearance-none cursor-pointer
                                            hover:bg-white/10 transition-all duration-200"
                                        >
                                            <option value="" className="bg-[#1a1a1a] text-white/60">Select a category</option>
                                            {categoryData.map((category) => (
                                                <option
                                                    key={category.categoryId}
                                                    value={category.categoryId}
                                                    className="bg-[#1a1a1a] text-white"
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-white/60"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateMovie}
                                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                                    rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-500/20"
                                >
                                    Create Movie
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Movies Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filterDataMovie.length > 0 ? (
                            filterDataMovie.map((movie: Movie) => (
                                <div key={movie.movieId}
                                    onClick={() => router.push(`/detail/${movie.movieId}`)}
                                    className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden 
                                    hover:transform hover:scale-[1.02] transition-all duration-300
                                    border border-white/10 hover:border-white/20 cursor-pointer">
                                    <div className="relative">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-full h-[300px] object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                        <button
                                            className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-xl rounded-full
                                             transition-all duration-300 transform hover:scale-110" onClick={(e) => {
                                                e.stopPropagation()
                                                toggleFavorite(movie.movieId);
                                            }}>
                                            {movie.isFavorite ? (
                                                <FaHeart className="text-red-500 w-5 h-5" />
                                            ) : (
                                                <FaRegHeart className="text-white/90 w-5 h-5" />
                                            )}
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMovieToDelete(movie);
                                                setShowDeleteModal(true);
                                            }}
                                            className="p-3 bg-black/40 backdrop-blur-xl rounded-full transition-all duration-300 transform hover:scale-110"
                                        >
                                            <FaTrash className="text-white/80 w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white/90 leading-tight line-clamp-1">{movie.title}</h3>
                                            <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xl">
                                                <FaStar className="text-yellow-400 mr-1.5 w-4 h-4" />
                                                <span className="font-medium text-white/90">{movie.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-white/60 text-sm mb-4 font-medium">
                                            <span>{movie.year}</span>
                                            <span className="mx-2">•</span>
                                            <span>{movie.duration} min</span>
                                            <span className="mx-2">•</span>
                                            <span>{movie.category.name}</span>
                                        </div>
                                        <div>
                                            <p className={`text-white/50 text-sm leading-relaxed ${showAll ? "" : "line-clamp-2"}`}>
                                                {movie.overview}
                                            </p>

                                            {movie.overview.length > 100 && (
                                                <button
                                                    onClick={() => setShowAll(!showAll)}
                                                    className="mt-2 text-blue-400 hover:underline text-sm"
                                                >
                                                    {showAll ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <FaSearch className="w-8 h-8 text-white/20" />
                                </div>
                                <p className="text-xl text-white/40 font-medium">No movies found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showDeleteModal && movieToDelete && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1a1a] rounded-2xl p-8 w-full max-w-md mx-4">
                        <h2 className="text-xl font-semibold text-white mb-4">Delete Movie</h2>
                        <p className="text-white/70 mb-6">
                            Are you sure you want to delete <span className="text-red-400 font-medium">"{movieToDelete.title}"</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setMovieToDelete(null);
                                }}
                                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await handleDeleteMovie(movieToDelete?.movieId);
                                    setShowDeleteModal(false);
                                    setMovieToDelete(null);
                                }}
                                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition text-white shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main >
    )
}

export default Page