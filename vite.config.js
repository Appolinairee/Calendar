import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: 'src/Calendar.js',
            name: 'ModernCalendar',
            fileName: 'calendar'
        },
        rollupOptions: {
            external: ['mithril'],
            output: {
                globals: {
                    mithril: 'm',
                },
                exports: 'default',
            },
        },
    },
});