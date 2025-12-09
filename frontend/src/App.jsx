import Layout from './components/layout/Layout.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignUpPage from './pages/auth/SignUpPage.jsx';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
