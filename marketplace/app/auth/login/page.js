'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Test backdoor account (frontend only)
      const testAccount = {
        email: 'seller@test.com',
        password: 'test123'
      };
      
      // Check if user is using test account
      if (email === testAccount.email && password === testAccount.password) {
        // Store seller authentication
        const sellerData = {
          email,
          name: 'Test Seller',
          isAuthenticated: true,
          isVerified: true,
          loginTime: new Date().toISOString(),
        };
        
        localStorage.setItem('seller', JSON.stringify(sellerData));
        
        // Redirect to vendor dashboard
        router.push('/vendor-dashboard');
        return;
      }
      
      // Regular login flow (would call backend)
      const sellerData = {
        email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      };
      
      localStorage.setItem('seller', JSON.stringify(sellerData));
      
      // Redirect to vendor dashboard
      router.push('/vendor-dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="material-symbols-outlined">storefront</span>
          </div>
          <h1>Seller Login</h1>
          <p>Access your vendor dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">mail</span>
              <input
                id="email"
                type="email"
                placeholder="seller@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="material-symbols-outlined">lock</span>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="test-credentials">
            <strong>🔓 Test Backdoor Account (Development):</strong>
            Email: <code>seller@test.com</code>
            <br />
            Password: <code>test123</code>
          </div>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>Don't have a seller account?</p>
          <Link href="/auth/signup" className="auth-link">
            Create Account
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
          <span className="material-symbols-outlined">verified</span>
          <div>
            <h3>Verified Seller</h3>
            <p>Build trust with verified badge</p>
          </div>
        </div>
        <div className="benefit-item">
          <span className="material-symbols-outlined">trending_up</span>
          <div>
            <h3>Grow Your Business</h3>
            <p>Reach thousands of buyers</p>
          </div>
        </div>
        <div className="benefit-item">
          <span className="material-symbols-outlined">support_agent</span>
          <div>
            <h3>24/7 Support</h3>
            <p>Dedicated seller support team</p>
          </div>
        </div>
      </div>
    </main>
  );
}
