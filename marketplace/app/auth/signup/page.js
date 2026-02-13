'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../auth.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    storeeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.storeeName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store seller authentication
      const sellerData = {
        storeeName: formData.storeeName,
        email: formData.email,
        phone: formData.phone,
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('seller', JSON.stringify(sellerData));
      
      // Redirect to vendor dashboard
      router.push('/vendor-dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="material-symbols-outlined">store_mall_directory</span>
          </div>
          <h1>Become a Seller</h1>
          <p>Start selling on our marketplace</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="storeName">Store Name</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">storefront</span>
              <input
                id="storeName"
                name="storeeName"
                type="text"
                placeholder="Your store name"
                value={formData.storeeName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">mail</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seller@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">phone</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">lock</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">lock_check</span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Seller Account'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>Already have a seller account?</p>
          <Link href="/auth/login" className="auth-link">
            Login Here
          </Link>
        </div>

        <div className="auth-help">
          <Link href="/" className="back-home">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Marketplace
          </Link>
        </div>
      </div>

      <div className="auth-benefits">
        <div className="benefit-item">
          <span className="material-symbols-outlined">shield</span>
          <div>
            <h3>Secure & Safe</h3>
            <p>Your data is protected</p>
          </div>
        </div>
        <div className="benefit-item">
          <span className="material-symbols-outlined">people</span>
          <div>
            <h3>Large Audience</h3>
            <p>Access to millions of customers</p>
          </div>
        </div>
        <div className="benefit-item">
          <span className="material-symbols-outlined">savings</span>
          <div>
            <h3>Low Commissions</h3>
            <p>Keep more of your earnings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
