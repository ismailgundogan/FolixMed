(() => {
    const storageKey = 'folixmed-theme';
    const body = document.body;
    const themeToggles = document.querySelectorAll('.folix-theme-toggle');
    const languageButtons = document.querySelectorAll('[data-language]');

    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        body.classList.toggle('folix-dark', isDark);

        themeToggles.forEach((themeToggle) => {
            const icon = themeToggle.querySelector('i');
            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');

            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    };

    setTheme(localStorage.getItem(storageKey) || 'light');

    themeToggles.forEach((themeToggle) => {
        themeToggle.addEventListener('click', () => {
            const nextTheme = body.classList.contains('folix-dark') ? 'light' : 'dark';
            localStorage.setItem(storageKey, nextTheme);
            setTheme(nextTheme);
        });
    });

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const language = button.dataset.language;
            localStorage.setItem('folixmed-language', language);
            document.documentElement.lang = language;

            languageButtons.forEach((item) => {
                const isActive = item.dataset.language === language;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });
        });
    });

    const savedLanguage = localStorage.getItem('folixmed-language');
    const savedLanguageButton = document.querySelector(`[data-language="${savedLanguage}"]`);
    if (savedLanguageButton) {
        savedLanguageButton.click();
    }
})();
