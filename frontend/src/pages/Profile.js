import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, logout, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || '',
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Update form data when user changes
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || '',
        }
      }));
    }
  }, [user]);
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested address fields
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const result = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      
      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // This is a mock implementation since we don't have a real password update endpoint
      // In a real app, you would call an API endpoint to update the password
      setTimeout(() => {
        toast.success('Password updated successfully');
        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  // Redirect or show login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your profile.</p>
          <Link to="/login" className="btn">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      
      <div className="profile-container">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Personal Information
          </button>
          <button
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Methods
          </button>
          <button
            className="tab-btn logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Personal Information</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    disabled
                  />
                  <small>Email cannot be changed</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <h3>Address</h3>
                
                <div className="form-group">
                  <label htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-block" 
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'password' && (
            <div className="tab-content">
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-block" 
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="tab-content">
              <h2>Order History</h2>
              <p className="placeholder-text">
                Your order history will appear here. Visit the Orders page to see your recent orders.
              </p>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="tab-content">
              <h2>Payment Methods</h2>
              <p className="placeholder-text">
                You don't have any saved payment methods yet. Add a payment method during checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;