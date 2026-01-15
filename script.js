// এলিমেন্ট সিলেক্ট
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const manIcon = document.getElementById('manIcon');
const profileSection = document.getElementById('profileSection');
const centerBox = document.querySelector('.center-box');

// Man click effect
manIcon.addEventListener('click', () => {
  manIcon.classList.add('clicked');
  setTimeout(() => manIcon.classList.remove('clicked'), 500);
});

// Load saved credentials
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('remember') === 'true') {
    usernameInput.value = localStorage.getItem('username') || '';
    passwordInput.value = localStorage.getItem('password') || '';
    rememberCheckbox.checked = true;
  }
});

// Login form submit
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // যেকোনো ইউজার/পাস হলেই লগইন
  if (rememberCheckbox.checked) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('remember', 'true');
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('remember', 'false');
  }

  // লগইন সাকসেস → প্রোফাইল দেখাও
  centerBox.classList.add('hidden');
  profileSection.classList.remove('hidden');
});

// Logout function
function logout() {
  profileSection.classList.add('hidden');
  centerBox.classList.remove('hidden');
  loginForm.reset();
  localStorage.setItem('remember', 'false');
}

// Voice Input
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const words = transcript.split(' ');

    const userIndex = words.indexOf('username');
    const passIndex = words.indexOf('password');

    if (userIndex !== -1 && words[userIndex + 1]) {
      usernameInput.value = words[userIndex + 1];
    }
    if (passIndex !== -1 && words[passIndex + 1]) {
      passwordInput.value = words[passIndex + 1];
    }

    if (!usernameInput.value || !passwordInput.value) {
      alert('Could not detect both username and password.');
    }
  };

  recognition.onerror = () => {
    alert('Voice input failed.');
  };
}
