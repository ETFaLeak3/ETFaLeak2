import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

console.log("%c🌵", "font-size: 100px;");
console.log("%cWhat are you doing here? 🤔", "color: #bada55; font-size: 20px; padding: 10px; font-weight: bold;");