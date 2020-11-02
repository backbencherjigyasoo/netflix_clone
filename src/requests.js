const APIKey = "1cf5ee0bed7e36ed4b2a21b6ac834d55";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${APIKey}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${APIKey}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${APIKey}&language=en-US`,
    fetchActionMovies: `/discover/tv?api_key=${APIKey}&with_genres=28`,
    fetchComedyMovies: `/discover/tv?api_key=${APIKey}&with_genres=35`,
    fetchHorrorMovies: `/discover/tv?api_key=${APIKey}&with_genres=27`,
    fetchRomanceMovies: `/discover/tv?api_key=${APIKey}&with_genres=10749`,
    fetchDocumentaries: `/discover/tv?api_key=${APIKey}&with_genres=99`,
}

export default requests;