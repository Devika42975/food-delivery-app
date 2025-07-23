import { toast } from 'react-toastify';

// Function to check if the backend server is running
export const checkServerStatus = async () => {
  try {
    const response = await fetch('/api', { 
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // Short timeout to quickly determine if server is available
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      console.log('Backend server is running');
      return true;
    } else {
      console.warn('Backend server returned an error status');
      return false;
    }
  } catch (error) {
    console.warn('Backend server is not available:', error);
    toast.warning(
      'Backend server is not running. Some features may be limited and mock data will be used.',
      { autoClose: 5000 }
    );
    return false;
  }
};

export default checkServerStatus;