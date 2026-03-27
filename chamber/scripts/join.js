document.addEventListener('DOMContentLoaded', () => {
    // Hidden timestamp
    const timestampField = document.getElementById('timestamp');
    if(timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal logic
    const openButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if(targetModal) {
                targetModal.showModal();
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            if(modal) {
                modal.close();
            }
        });
    });

    // Close on outside click for all dialogs
    document.querySelectorAll('dialog').forEach(modal => {
        modal.addEventListener('click', (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});
