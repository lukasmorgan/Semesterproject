document.getElementById('deviceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const ip = document.getElementById('ip').value;
    const isChecked = document.getElementById('confirm').checked;
    const msg = document.getElementById('msg');

    // Validation
    if (name.length < 2) {
        msg.innerText = "Name is too short!";
        msg.style.color = "red";
        return;
    }
    if (!isChecked) {
        msg.innerText = "Please confirm accuracy.";
        msg.style.color = "red";
        return;
    }

    // Data to send
    const formData = {
        name: name,
        type: document.getElementById('type').value,
        os: document.querySelector('input[name="os"]:checked').value,
        ip: ip
    };

    // Fetch POST Call
    const response = await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.redirect) {
        window.location.href = result.redirect; // Redirect on success
    }
});