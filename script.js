document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Date Implementation
    const dateSpan = document.getElementById('dynamic-date');
    if (dateSpan) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Get current date, adjust to mimic original text format
        let today = new Date();
        let formattedDate = today.toLocaleDateString('en-US', options); // Using English to match "Saturday, October 18, 2025" from original text, or switch to pt-BR if needed, but original used english strings. Let's use pt-BR for general standard.
        // Wait, original text: 'Hoje,  Saturday, October 18, 2025 é o último dia'. Let's just generate dynamic in portuguese to be nice.
        let ptDate = today.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        dateSpan.textContent = ptDate.charAt(0).toUpperCase() + ptDate.slice(1);
    }

    // 2. Random Number Generator for Social Proof
    const randomNumSpan = document.getElementById('random-number');
    if (randomNumSpan) {
        // Starts around 600, randomly fluctuates
        let currentNum = 602;
        setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            currentNum += change;
            if (currentNum < 450) currentNum = 450;
            if (currentNum > 850) currentNum = 850;
            randomNumSpan.textContent = currentNum;
        }, 4000);
    }

    // 3. FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            // Toggle active class on current item
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. Testimonials Simple Carousel
    const track = document.getElementById('testimonial-track');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    
    if (track && btnNext && btnPrev) {
        let position = 0;
        
        btnNext.addEventListener('click', () => {
            // Super simple track scroll
            const imgWidth = track.querySelector('img').clientWidth + 20; // 20 is gap
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            position += imgWidth;
            if (position > maxScroll) position = 0; // loop back
            
            track.style.transform = `translateX(-${position}px)`;
        });
        
        btnPrev.addEventListener('click', () => {
            const imgWidth = track.querySelector('img').clientWidth + 20;
            position -= imgWidth;
            if (position < 0) {
                const maxScroll = track.scrollWidth - track.clientWidth;
                position = maxScroll; 
            }
            
            track.style.transform = `translateX(-${position}px)`;
        });
    }

    // 5. Scroll Animations Trigger (Intersection Observer)
    const fadeElements = document.querySelectorAll('.slide-up, .fade-in-left, .fade-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // If it's zoom-in, we just do a small opacity + transform transition
                if(entry.target.classList.contains('zoom-in')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        // Prepare initial state for JS observed elements
        if(el.classList.contains('zoom-in')) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            el.style.transition = 'all 0.6s ease-out';
        }
        observer.observe(el);
    });

});
