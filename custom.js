// Initialize AOS
AOS.init();


document.addEventListener('DOMContentLoaded', function () {
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const formData = new FormData(appointmentForm);
            const object = {};
            formData.forEach((value, key) => { object[key] = value });

            fetch('/submit-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(response => response.text())
            .then(result => {
                if (result.trim() === "success") {
                    alert("Appointment booked successfully!");
                    appointmentForm.reset();
                } else {
                    alert("Error booking appointment. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Something went wrong.");
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); 

            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => { object[key] = value });

            fetch('/submit-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(response => response.text())
            .then(data => {
                if (data.trim() === 'success') {
                    document.getElementById('confirmationMessage').style.display = 'block';
                    contactForm.reset();
                } else {
                    alert('There was an error, please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error, please try again.');
            });
        });
    }

    // Navbar Active Link Logic
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        link.addEventListener('click', function () {
            document.querySelectorAll('.navbar-nav .nav-link').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
