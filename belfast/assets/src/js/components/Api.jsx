/*
 * Import remote dependencies.
 */
import Axios from 'axios';

/*
 * Create a Api object with Axios and
 * configure it for the WordPRess Rest Api.
 *
 * The 'mynamespace' object is injected into the page
 * using the WordPress wp_localize_script function.
 */
const Api = Axios.create({
    baseUrl: "https://www.ulster.ac.uk/_web_services/ulster/json/campus-maps",
    headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        'Content-Type': 'application/json',
        'Accept': 'application/json',

    }
});

export default Api;