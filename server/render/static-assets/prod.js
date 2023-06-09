import { GOOGLE_ANALYTICS_ID } from '../../../config/env';
import assets from '../../../public/assets/manifest.json';

const createFontAweScript = () => `<script src="https://kit.fontawesome.com/23b277731a.js"></script>`;
const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;
const createVendorScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['vendor.js']}"></script>`;

const createTrackingScript = () => (GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '');

const createAnalyticsSnippet = (id) => `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => `
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;

{/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" /> */}



export {
 createAppScript, createVendorScript, createTrackingScript, createStylesheets, createFontAweScript
};
