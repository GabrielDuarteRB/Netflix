const API_KEY = 'fddb1de4fc039741c199894c2a097895'
const URL_BASE = 'https://api.themoviedb.org/3'

/*
- originais da netflix
- recomendados 
- em alta
- ação
- comédia
- terror
- romance
- documentários
*/

const basicFetch = async(endpoint) => {
    const req = await fetch(`${URL_BASE}${endpoint}`);
    const json = await req.json();
    return json
}
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                item: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                item: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                item: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                item: await basicFetch(`/discover/movie?with_generes=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                item: await basicFetch(`/discover/movie?with_generes=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                item: await basicFetch(`/discover/movie?with_generes=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                item: await basicFetch(`/discover/movie?with_generes=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                item: await basicFetch(`/discover/movie?with_generes=99&language=pt-BR&api_key=${API_KEY}`)
            },

        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {}

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                    info = null;
                break
            }
        }

        return info
    }
}