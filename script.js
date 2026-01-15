document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = "Authenticating...";
    btn.style.pointerEvents = "none";

    // Fake loading delay
    setTimeout(() => {
        alert("Login Successful! Redirecting...");
        btn.innerHTML = "Success!";
        btn.style.background = "#28a745";
    }, 2000);
});
