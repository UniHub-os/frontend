// Modal functionality
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Tab functionality
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab headers
    document.querySelectorAll('.tab-header div').forEach(header => {
        header.classList.remove('active');
    });
    
    // Show the selected tab and activate corresponding header
    document.getElementById(tabId).classList.add('active');
    if (tabId === 'login-tab') {
        document.querySelector('.tab-header div:first-child').classList.add('active');
    } else if (tabId === 'register-tab') {
        document.querySelector('.tab-header div:last-child').classList.add('active');
    }
}

// Show password reset tab
function showPasswordReset() {
    showTab('reset-tab');
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Send login request to backend
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });
            const data = await response.json();
            if (response.ok && data.token) {
                // Store JWT token
                localStorage.setItem('token', data.token);
                // Fetch user profile after login
                const profile = await fetchUserProfile();
                if (profile) {
                    // Example: personalize UI or store profile info
                    console.log('User profile:', profile);
                }
                // Redirect to event.html after successful login
                window.location.href = 'event.html';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('Error connecting to authentication service');
        }
    });
    
    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        // Send registration request to backend
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registration successful! Please log in.');
                showTab('login-tab');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            alert('Error connecting to authentication service');
        }
    });
    
    // Password reset form submission
    document.getElementById('resetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        // Simulate password reset (replace with actual implementation)
        console.log('Password reset for:', email);
        alert(`Password reset link sent to ${email}`);
        showTab('login-tab');
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('loginModal')) {
            closeLoginModal();
        }
    });
    
    // Example: Fetch user profile after login (optional, can be used elsewhere)
    async function fetchUserProfile() {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.ok) {
                const data = await response.json();
                // You can use this data to personalize the UI
                return data;
            } else {
                // Token might be invalid or expired
                localStorage.removeItem('token');
                return null;
            }
        } catch (err) {
            return null;
        }
    }
});