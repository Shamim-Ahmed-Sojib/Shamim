document.addEventListener('DOMContentLoaded', () => {
    // Mobile nav toggle
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-nav');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Contact form — real submission via FormSubmit (AJAX, no page reload)
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('cf-submit');
    const submitLabel = document.getElementById('cf-submit-label');
    const status = document.getElementById('cf-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            submitLabel.textContent = 'Sending...';
            status.classList.add('hidden');

            const endpoint = 'https://formsubmit.co/ajax/' + form.action.split('/').pop();
            const formData = new FormData(form);

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (!response.ok) throw new Error('Request failed');

                status.textContent = "Message sent — thank you! I'll get back to you soon.";
                status.style.color = '#2f6f4e';
                form.reset();
            } catch (err) {
                status.textContent = "Something went wrong sending your message. Please email directly at shsojib.x@gmail.com.";
                status.style.color = '#a33';
            } finally {
                submitBtn.disabled = false;
                submitLabel.textContent = 'Send Message';
                status.classList.remove('hidden');
            }
        });
    }
});
