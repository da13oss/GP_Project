import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';

/**
 * Main App component that sets up routing and authentication
 */
function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;