import '../css/app.css';
import './bootstrap';

import { mount } from 'svelte'
import { createInertiaApp } from '@inertiajs/svelte';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./routes/${name}.svelte`,
            import.meta.glob('./routes/**/*.svelte', { eager: true }),
        ),
    setup({ el, App, props, plugin }) {
        mount(App, { target: el, props });
    },
    progress: {
        color: '#4B5563',
    },
});
