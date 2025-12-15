// Initialize EmailJS
emailjs.init("_I_ZM9s-kplNAnA8J"); // Replace with your EmailJS User ID

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous messages
        formMessage.textContent = '';
        formMessage.className = '';

        // Collect values
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const subject = form.querySelector('[name="subject"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !phone || !subject || !message) {
            formMessage.textContent = "Please fill all required fields.";
            formMessage.className = "text-danger fw-bold";
            return;
        }

        // Loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitButton.disabled = true;

        // Send form via EmailJS
        emailjs.sendForm("service_4i85l47", "template_um01m45", form)
            .then(function(response) {
                formMessage.textContent = "Message sent successfully! We'll contact you soon.";
                formMessage.className = "text-success fw-bold";
                form.reset();
                console.log("SUCCESS!", response.status, response.text);
            }, function(error) {
                formMessage.textContent = "Failed to send message. Please try again.";
                formMessage.className = "text-danger fw-bold";
                console.error("FAILED...", error);
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
});
