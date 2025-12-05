import { ref, onMounted } from 'vue';

const THEME_KEY = 'user-theme';
const themes = ['light', 'dark'];
const currentTheme = ref(themes[0]);

export function useTheme() {
    const htmlEl = document.documentElement;

    const applyTheme = (themeName) => {
        htmlEl.classList.remove(...themes);
        htmlEl.classList.add(themeName);

        if (themeName === 'light') {
            htmlEl.classList.remove('dark');
        } else {
            htmlEl.classList.add('dark');
        }

        localStorage.setItem(THEME_KEY, themeName);
        currentTheme.value = themeName;
    };

    const toggleTheme = () => {
        const currentIndex = themes.indexOf(currentTheme.value);
        const nextIndex = (currentIndex + 1) % themes.length;
        applyTheme(themes[nextIndex]);
    };

    onMounted(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme && themes.includes(savedTheme)) {
            applyTheme(savedTheme);
        } else {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(systemDark ? 'dark' : 'light');
        }
    });

    return {
        currentTheme,
        applyTheme,
        toggleTheme,
    };
}