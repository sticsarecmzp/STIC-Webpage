document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Hero Text Rotator (ASSUMING, PANICKING, CODING ALONE, HESITATING)
    // -------------------------------------------------------------
    const rotatorWords = document.querySelectorAll('#heroRotator .rotator-word');
    if (rotatorWords.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            rotatorWords[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % rotatorWords.length;
            rotatorWords[currentIndex].classList.add('active');
        }, 2600);
    }

    // -------------------------------------------------------------
    // 2. Mobile Nav Drawer Toggle
    // -------------------------------------------------------------
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    if (mobileMenuToggle && mobileNavDrawer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNavDrawer.classList.toggle('active');
        });

        document.querySelectorAll('.mobile-nav-item').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavDrawer.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Clubs Hub Category Filtering
    // -------------------------------------------------------------
    const clubFilterChips = document.querySelectorAll('#clubFilterChips .chip-btn');
    const clubCards = document.querySelectorAll('#clubsGrid .club-card');

    clubFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            clubFilterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');
            clubCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Handle "Join Track →" buttons pre-filling the join form
    document.querySelectorAll('.btn-join-track').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prefill = btn.getAttribute('data-prefill');
            const clubSelect = document.getElementById('clubSelection');
            if (clubSelect && prefill) {
                clubSelect.value = prefill;
            }
        });
    });

    // -------------------------------------------------------------
    // 4. Events Category Filtering
    // -------------------------------------------------------------
    const eventFilterChips = document.querySelectorAll('#eventFilterChips .chip-btn');
    const eventCards = document.querySelectorAll('#eventsGrid .event-card');

    eventFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            eventFilterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');
            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. "Add to Calendar" (.ics generation)
    // -------------------------------------------------------------
    document.querySelectorAll('.add-cal-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const title = button.getAttribute('data-event-title') || 'STIC SAREC Event';
            const dateStr = button.getAttribute('data-event-date') || '2026-10-01';
            const location = button.getAttribute('data-event-loc') || 'SAREC Mirzapur';

            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//STIC SAREC//Events Calendar//EN',
                'BEGIN:VEVENT',
                `SUMMARY:${title}`,
                `DESCRIPTION:Official STIC — Technology & Innovation Community event at SAREC Mirzapur.`,
                `LOCATION:${location}`,
                `DTSTART:${dateStr.replace(/-/g, '')}T100000Z`,
                `DTEND:${dateStr.replace(/-/g, '')}T160000Z`,
                'STATUS:CONFIRMED',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            const origText = button.textContent;
            button.textContent = '✓ Calendar Saved';
            setTimeout(() => {
                button.textContent = origText;
            }, 2500);
        });
    });

    // -------------------------------------------------------------
    // 6. Team Terminal CLI Profile Modal
    // -------------------------------------------------------------
    const cliModal = document.getElementById('cliModal');
    const cliTerminalContent = document.getElementById('cliTerminalContent');
    const cliCloseDot = document.getElementById('cliCloseDot');

    document.querySelectorAll('.team-cli-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const role = btn.getAttribute('data-role');
            const dept = btn.getAttribute('data-dept');
            const focus = btn.getAttribute('data-focus');

            if (cliTerminalContent) {
                cliTerminalContent.innerHTML = `
                    <div style="color: #94a3b8; margin-bottom: 0.5rem;">Connecting to SAREC Mirzapur developer node... [OK]</div>
                    <div style="margin-bottom: 0.75rem;"><span style="color: #38bdf8;">stic@sarec:~$</span> <span style="color: #f8fafc;">finger profile --user="${name.toLowerCase().replace(/\s+/g, '.')}"</span></div>
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">
                        <div style="color: #10b981; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">${name}</div>
                        <div style="color: #e2e8f0; font-weight: 600;">Role: <span style="color: #38bdf8;">${role}</span></div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-top: 0.25rem;">Affiliation: ${dept}</div>
                        <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.5rem; border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 0.5rem;">
                            <strong>Core Stack & Focus:</strong><br/>${focus}
                        </div>
                    </div>
                    <div><span style="color: #38bdf8;">stic@sarec:~$</span> <span style="animation: blinkCursor 1s infinite;">_</span></div>
                `;
            }

            if (cliModal) cliModal.classList.add('active');
        });
    });

    const hideCliModal = () => {
        if (cliModal) cliModal.classList.remove('active');
    };

    if (cliCloseDot) cliCloseDot.addEventListener('click', hideCliModal);

    // Global Modal Backdrop Click & ESC Key
    window.addEventListener('click', (e) => {
        if (e.target === cliModal) hideCliModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideCliModal();
        }
    });

    // -------------------------------------------------------------
    // 8. Multi-Club Google Apps Script Form Submission
    // -------------------------------------------------------------
    const form = document.getElementById('membershipForm');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Submitting Application...</span>
                `;
            }

            try {
                // Submit to Google Apps Script endpoint via no-cors mode
                await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    mode: 'no-cors'
                });

                if (submitBtn) {
                    submitBtn.style.background = '#10b981';
                    submitBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Application Submitted Successfully!</span>
                    `;
                }

                // Show celebratory alert
                alert("🎉 Welcome to STIC — SAREC, Mirzapur! Your membership application has been recorded. Check your email for further updates.");
                form.reset();

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        submitBtn.innerHTML = `
                            <span>Submit Interest Form</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        `;
                    }
                }, 4000);

            } catch (err) {
                // Form submission error handled gracefully
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Try Again</span>`;
                }
                alert("An error occurred during submission. Please check your internet connection or email us directly at sticsarecmzp@gmail.com.");
            }
        });
    }

    // -------------------------------------------------------------
    // 9. Floating Cookie / Analytics Toast
    // -------------------------------------------------------------
    const cookieToast = document.getElementById('cookieToast');
    const cookieAllowBtn = document.getElementById('cookieAllowBtn');
    const cookieCloseBtn = document.getElementById('cookieCloseBtn');

    if (localStorage.getItem('stic_analytics_consent') === 'true') {
        if (cookieToast) cookieToast.classList.add('hidden');
    }

    const dismissCookieToast = () => {
        localStorage.setItem('stic_analytics_consent', 'true');
        if (cookieToast) cookieToast.classList.add('hidden');
    };

    if (cookieAllowBtn) cookieAllowBtn.addEventListener('click', dismissCookieToast);
    if (cookieCloseBtn) cookieCloseBtn.addEventListener('click', dismissCookieToast);

    // -------------------------------------------------------------
    // 10. Dark / Light Theme Toggle Management
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const updateThemeAria = (theme) => {
        if (themeToggleBtn) {
            const isDark = theme === 'dark';
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
            themeToggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        }
    };

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeAria(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const curTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = curTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (e) {}
            updateThemeAria(nextTheme);
        });
    }

    // -------------------------------------------------------------
    // 11. Scroll Reveal Fade-Up Animations (IntersectionObserver)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-revealed'));
    }

});
