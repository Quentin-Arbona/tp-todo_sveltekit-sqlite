    import { error } from '@sveltejs/kit'; 
    import { env } from '$env/dynamic/private';

    export async function load({ fetch }) {

        const apiKey = env.WEATHER_API_KEY;
        
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Aix-en-Provence`);
    
        if (!response.ok) {
            throw error(404, 'Echec lors de la récupération de la météo');
        }    
     
        const meteo = await response.json();
        return { meteo };
    }
