document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Fallback logic inside the thankyou HTML IDs
    const showFirst = document.getElementById('showFirst');
    const showLast = document.getElementById('showLast');
    const showEmail = document.getElementById('showEmail');
    const showPhone = document.getElementById('showPhone');
    const showBusiness = document.getElementById('showBusiness');
    const showTimestamp = document.getElementById('showTimestamp');

    // Populate the results if elements exist
    if(showFirst) showFirst.textContent = urlParams.get('first') || 'N/A';
    if(showLast) showLast.textContent = urlParams.get('last') || '';
    if(showEmail) showEmail.textContent = urlParams.get('email') || 'N/A';
    if(showPhone) showPhone.textContent = urlParams.get('phone') || 'N/A';
    if(showBusiness) showBusiness.textContent = urlParams.get('business') || 'N/A';
    
    // Format timestamp nicely if exists
    if(showTimestamp) {
        const ts = urlParams.get('timestamp');
        if(ts) {
            try {
                const dateObj = new Date(ts);
                showTimestamp.textContent = dateObj.toLocaleString();
            } catch(e) {
                showTimestamp.textContent = ts;
            }
        } else {
            showTimestamp.textContent = 'N/A';
        }
    }
});
