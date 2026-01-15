const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const themeToggle = document.getElementById('themeToggle');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved credentials
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('remember') === 'true') {
    usernameInput.value = localStorage.getItem('username') || '';
    passwordInput.value = localStorage.getItem('password') || '';
    rememberCheckbox.checked = true;
  }
});

// Form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // Save credentials if "Remember me" is checked
  if (rememberCheckbox.checked) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('remember', 'true');
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('remember', 'false');
  }

  // Dummy login
  if (username === 'admin' && password === '1234') {
    alert(`Welcome, ${username}!`);
    // Redirect or next action
  } else {
    alert('Invalid credentials.');
  }
});

// Voice Input
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const words = transcript.split(' ');

    // Try to find username and password
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
