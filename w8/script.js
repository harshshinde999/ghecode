// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form validation
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            eventType: document.getElementById('eventType').value,
            eventDate: document.getElementById('eventDate').value,
            comments: document.getElementById('comments').value,
            dietaryPreferences: [
                document.getElementById('vegetarian').checked ? 'Vegetarian' : null,
                document.getElementById('vegan').checked ? 'Vegan' : null,
                document.getElementById('glutenFree').checked ? 'Gluten-Free' : null
            ].filter(Boolean)
        };

        // Create popup content
        const popupContent = `
            <div class="modal fade" id="registrationPopup" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registration Successful!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6>Registration Details:</h6>
                            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                            <p><strong>Email:</strong> ${formData.email}</p>
                            <p><strong>Phone:</strong> ${formData.phone}</p>
                            <p><strong>Event Type:</strong> ${formData.eventType}</p>
                            <p><strong>Event Date:</strong> ${formData.eventDate}</p>
                            ${formData.comments ? `<p><strong>Comments:</strong> ${formData.comments}</p>` : ''}
                            ${formData.dietaryPreferences.length > 0 ? 
                                `<p><strong>Dietary Preferences:</strong> ${formData.dietaryPreferences.join(', ')}</p>` : ''}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add popup to body
        document.body.insertAdjacentHTML('beforeend', popupContent);

        // Show popup
        const popup = new bootstrap.Modal(document.getElementById('registrationPopup'));
        popup.show();

        // Reset form
        form.reset();
        form.classList.remove('was-validated');
    });

    // Phone number validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Date validation - prevent past dates
    const dateInput = document.getElementById('eventDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}); 