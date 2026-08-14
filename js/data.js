/**
 * Netflix Clone - Central Media Database
 * Contains rich movie & TV show metadata, episodes, cast, genres, and video streams.
 */

const NETFLIX_DATA = {
  // Featured Billboard Title
  heroMovie: {
    id: "hero-stranger-things",
    title: "Stranger Things",
    type: "tv",
    badge: "TOP 10 • #1 IN TV SHOWS TODAY",
    logoText: "STRANGER THINGS",
    backdrop: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1920&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl with telekinetic powers.",
    rating: "16+",
    matchScore: 98,
    seasons: "4 Seasons",
    duration: "4 Seasons (34 Episodes)",
    releaseYear: 2024,
    quality: "4K Ultra HD",
    audio: "5.1 Spatial Audio",
    genres: ["Sci-Fi", "Horror", "Drama", "Mystery", "80s Nostalgia"],
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour", "Gaten Matarazzo"],
    creator: "The Duffer Brothers",
    episodes: [
      {
        id: "st-s4-e1",
        number: 1,
        title: "Chapter One: The Hellfire Club",
        duration: "1h 16m",
        overview: "El struggles to fit in at school in California. Back in Hawkins, the D&D party recruits a new member while a dark force stirs.",
        thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
      },
      {
        id: "st-s4-e2",
        number: 2,
        title: "Chapter Two: Vecna's Curse",
        duration: "1h 17m",
        overview: "A plane brings Mike to California, and a dead body brings Hawkins to a halt. Nancy starts looking for answers.",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      },
      {
        id: "st-s4-e3",
        number: 3,
        title: "Chapter Three: The Monster and the Superhero",
        duration: "1h 03m",
        overview: "Murray and Joyce fly to Alaska. El faces serious consequences after the roller rink incident. Robin and Nancy dig into Hawkins history.",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
      },
      {
        id: "st-s4-e4",
        number: 4,
        title: "Chapter Four: Dear Billy",
        duration: "1h 19m",
        overview: "Max is in grave danger and running out of time. A patient at Pennhurst asylum has answers. Hopper works hard in Russia.",
        thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      }
    ]
  },

  // Full Movie and TV Catalog
  catalog: [
    // Originals
    {
      id: "orig-1",
      title: "Stranger Things",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, supernatural forces, and one strange little girl.",
      rating: "16+",
      matchScore: 99,
      duration: "4 Seasons",
      releaseYear: 2024,
      quality: "4K Ultra HD",
      genres: ["Sci-Fi", "Horror", "Drama"],
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
      creator: "The Duffer Brothers",
      categories: ["originals", "trending", "sci-fi"]
    },
    {
      id: "orig-2",
      title: "Wednesday",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      synopsis: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
      rating: "13+",
      matchScore: 97,
      duration: "1 Season",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Mystery", "Fantasy", "Comedy"],
      cast: ["Jenna Ortega", "Gwendoline Christie", "Emma Myers"],
      creator: "Alfred Gough, Miles Millar",
      categories: ["originals", "trending", "top10"]
    },
    {
      id: "orig-3",
      title: "Squid Game",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      synopsis: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
      rating: "18+",
      matchScore: 96,
      duration: "2 Seasons",
      releaseYear: 2024,
      quality: "4K Ultra HD",
      genres: ["Thriller", "Drama", "Suspense"],
      cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon"],
      creator: "Hwang Dong-hyuk",
      categories: ["originals", "trending", "top10"]
    },
    {
      id: "orig-4",
      title: "Money Heist (La Casa de Papel)",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      synopsis: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
      rating: "16+",
      matchScore: 95,
      duration: "5 Seasons",
      releaseYear: 2021,
      quality: "HD",
      genres: ["Action", "Crime", "Thriller"],
      cast: ["Álvaro Morte", "Úrsula Corberó", "Pedro Alonso"],
      creator: "Álex Pina",
      categories: ["originals", "action", "top10"]
    },
    {
      id: "orig-5",
      title: "The Witcher",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      synopsis: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      rating: "18+",
      matchScore: 91,
      duration: "3 Seasons",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Action", "Fantasy", "Adventure"],
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
      creator: "Lauren Schmidt Hissrich",
      categories: ["originals", "action", "sci-fi"]
    },
    {
      id: "orig-6",
      title: "Cyberpunk: Edgerunners",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      synopsis: "In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw: an edgerunner.",
      rating: "18+",
      matchScore: 98,
      duration: "10 Episodes",
      releaseYear: 2022,
      quality: "4K Ultra HD",
      genres: ["Anime", "Action", "Sci-Fi"],
      cast: ["KENN", "Aoi Yuuki", "Hiroki Touchi"],
      creator: "Studio Trigger / CD Projekt Red",
      categories: ["originals", "sci-fi", "trending"]
    },
    {
      id: "orig-7",
      title: "The Queen's Gambit",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      synopsis: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
      rating: "16+",
      matchScore: 98,
      duration: "Limited Series",
      releaseYear: 2020,
      quality: "4K Ultra HD",
      genres: ["Drama", "Intimate", "Emotional"],
      cast: ["Anya Taylor-Joy", "Bill Camp", "Marielle Heller"],
      creator: "Scott Frank, Allan Scott",
      categories: ["originals", "toprated"]
    },
    {
      id: "orig-8",
      title: "Black Mirror",
      type: "tv",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      synopsis: "This sci-fi anthology series explores a twisted, high-tech near-future where humanity's greatest innovations and darkest instincts collide.",
      rating: "18+",
      matchScore: 94,
      duration: "6 Seasons",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Sci-Fi", "Thriller", "Dystopian"],
      cast: ["Daniel Kaluuya", "Jon Hamm", "Bryce Dallas Howard"],
      creator: "Charlie Brooker",
      categories: ["originals", "sci-fi"]
    },

    // Trending & Top 10 Movies
    {
      id: "mov-1",
      title: "Oppenheimer",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      synopsis: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project to develop the atomic bomb.",
      rating: "18+",
      matchScore: 99,
      duration: "3h 0m",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Biography", "Drama", "History"],
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
      creator: "Christopher Nolan",
      categories: ["trending", "top10", "toprated"]
    },
    {
      id: "mov-2",
      title: "Interstellar",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      rating: "13+",
      matchScore: 99,
      duration: "2h 49m",
      releaseYear: 2014,
      quality: "4K Ultra HD",
      genres: ["Sci-Fi", "Adventure", "Drama"],
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      creator: "Christopher Nolan",
      categories: ["trending", "sci-fi", "toprated"]
    },
    {
      id: "mov-3",
      title: "Dune: Part Two",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      rating: "13+",
      matchScore: 98,
      duration: "2h 46m",
      releaseYear: 2024,
      quality: "4K Ultra HD",
      genres: ["Sci-Fi", "Action", "Adventure"],
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
      creator: "Denis Villeneuve",
      categories: ["trending", "top10", "sci-fi"]
    },
    {
      id: "mov-4",
      title: "Spider-Man: Across the Spider-Verse",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      rating: "PG",
      matchScore: 97,
      duration: "2h 20m",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Animation", "Action", "Adventure"],
      cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
      creator: "Joaquim Dos Santos, Kemp Powers",
      categories: ["trending", "top10", "action"]
    },
    {
      id: "mov-5",
      title: "John Wick: Chapter 4",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      synopsis: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
      rating: "18+",
      matchScore: 95,
      duration: "2h 49m",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Action", "Crime", "Thriller"],
      cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
      creator: "Chad Stahelski",
      categories: ["action", "trending", "top10"]
    },
    {
      id: "mov-6",
      title: "Inception",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: "13+",
      matchScore: 99,
      duration: "2h 28m",
      releaseYear: 2010,
      quality: "4K Ultra HD",
      genres: ["Action", "Sci-Fi", "Thriller"],
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
      creator: "Christopher Nolan",
      categories: ["sci-fi", "toprated", "action"]
    },
    {
      id: "mov-7",
      title: "Top Gun: Maverick",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f9?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      synopsis: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
      rating: "13+",
      matchScore: 96,
      duration: "2h 10m",
      releaseYear: 2022,
      quality: "4K Ultra HD",
      genres: ["Action", "Drama"],
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
      creator: "Joseph Kosinski",
      categories: ["action", "trending"]
    },
    {
      id: "mov-8",
      title: "Blade Runner 2049",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      synopsis: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
      rating: "18+",
      matchScore: 93,
      duration: "2h 44m",
      releaseYear: 2017,
      quality: "4K Ultra HD",
      genres: ["Sci-Fi", "Mystery", "Drama"],
      cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
      creator: "Denis Villeneuve",
      categories: ["sci-fi", "toprated"]
    },

    // Action & Thrillers
    {
      id: "act-1",
      title: "Extraction 2",
      type: "movie",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      synopsis: "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.",
      rating: "18+",
      matchScore: 92,
      duration: "2h 3m",
      releaseYear: 2023,
      quality: "4K Ultra HD",
      genres: ["Action", "Thriller"],
      cast: ["Chris Hemsworth", "Golshifteh Farahani", "Tornike Gogrichiani"],
      creator: "Sam Hargrave",
      categories: ["action", "originals", "top10"]
    },
    {
      id: "act-2",
      title: "The Dark Knight",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      synopsis: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability.",
      rating: "13+",
      matchScore: 99,
      duration: "2h 32m",
      releaseYear: 2008,
      quality: "4K Ultra HD",
      genres: ["Action", "Crime", "Drama"],
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      creator: "Christopher Nolan",
      categories: ["action", "toprated"]
    },
    {
      id: "act-3",
      title: "Mad Max: Fury Road",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      synopsis: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners and a drifter named Max.",
      rating: "16+",
      matchScore: 95,
      duration: "2h 0m",
      releaseYear: 2015,
      quality: "4K Ultra HD",
      genres: ["Action", "Sci-Fi", "Adventure"],
      cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
      creator: "George Miller",
      categories: ["action", "sci-fi"]
    },
    {
      id: "act-4",
      title: "Gladiator",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      synopsis: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      rating: "16+",
      matchScore: 97,
      duration: "2h 35m",
      releaseYear: 2000,
      quality: "4K Ultra HD",
      genres: ["Action", "Adventure", "Drama"],
      cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
      creator: "Ridley Scott",
      categories: ["action", "toprated"]
    },

    // Comedies & Feel-Good
    {
      id: "com-1",
      title: "Brooklyn Nine-Nine",
      type: "tv",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      synopsis: "Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.",
      rating: "13+",
      matchScore: 97,
      duration: "8 Seasons",
      releaseYear: 2021,
      quality: "HD",
      genres: ["Comedy", "Crime"],
      cast: ["Andy Samberg", "Stephanie Beatriz", "Terry Crews", "Andre Braugher"],
      creator: "Dan Goor, Michael Schur",
      categories: ["comedy", "trending"]
    },
    {
      id: "com-2",
      title: "Glass Onion: A Knives Out Mystery",
      type: "movie",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      synopsis: "Famed Southern detective Benoit Blanc travels to Greece for his latest case, surrounding a tech billionaire and his eclectic crew of friends.",
      rating: "13+",
      matchScore: 94,
      duration: "2h 19m",
      releaseYear: 2022,
      quality: "4K Ultra HD",
      genres: ["Comedy", "Mystery", "Crime"],
      cast: ["Daniel Craig", "Edward Norton", "Janelle Monáe", "Kate Hudson"],
      creator: "Rian Johnson",
      categories: ["comedy", "originals", "top10"]
    },
    {
      id: "com-3",
      title: "Red Notice",
      type: "movie",
      isOriginal: true,
      poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      synopsis: "An FBI profiler pursuing the world's most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who's always one step ahead.",
      rating: "13+",
      matchScore: 90,
      duration: "1h 58m",
      releaseYear: 2021,
      quality: "4K Ultra HD",
      genres: ["Comedy", "Action", "Adventure"],
      cast: ["Dwayne Johnson", "Ryan Reynolds", "Gal Gadot"],
      creator: "Rawson Marshall Thurber",
      categories: ["comedy", "originals", "action"]
    },
    {
      id: "com-4",
      title: "Free Guy",
      type: "movie",
      isOriginal: false,
      poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1280&auto=format&fit=crop&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      synopsis: "A bank teller discovers that he's actually an NPC inside a brutal, open world video game and decides to become the hero of his own story.",
      rating: "13+",
      matchScore: 92,
      duration: "1h 55m",
      releaseYear: 2021,
      quality: "4K Ultra HD",
      genres: ["Comedy", "Action", "Sci-Fi"],
      cast: ["Ryan Reynolds", "Jodie Comer", "Taika Waititi", "Joe Keery"],
      creator: "Shawn Levy",
      categories: ["comedy", "sci-fi"]
    }
  ],

  // Pre-configured category row definitions
  rowSections: [
    {
      id: "row-continue",
      title: "Continue Watching for Siddharth",
      filterType: "continue",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-top10",
      title: "Top 10 in Your Country Today",
      filterType: "top10",
      isOriginal: false,
      isTop10: true
    },
    {
      id: "row-originals",
      title: "Netflix Originals",
      filterType: "originals",
      isOriginal: true,
      isTop10: false
    },
    {
      id: "row-trending",
      title: "Trending Now",
      filterType: "trending",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-mylist",
      title: "My List",
      filterType: "mylist",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-action",
      title: "Action & Thrillers",
      filterType: "action",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-scifi",
      title: "Sci-Fi & Fantasy",
      filterType: "sci-fi",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-comedy",
      title: "Comedies & Feel-Good",
      filterType: "comedy",
      isOriginal: false,
      isTop10: false
    },
    {
      id: "row-toprated",
      title: "Critically Acclaimed & Top Rated",
      filterType: "toprated",
      isOriginal: false,
      isTop10: false
    }
  ],

  // User Profiles
  profiles: [
    {
      id: "profile-1",
      name: "Siddharth",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      isKid: false
    },
    {
      id: "profile-2",
      name: "College Buddy",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
      isKid: false
    },
    {
      id: "profile-3",
      name: "Kids",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80",
      isKid: true
    }
  ],

  // FAQ Items for Landing Page
  faqs: [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price."
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own dedicated space with PIN-protected parental controls."
    }
  ]
};

// Global helper: Find item by ID
function getItemById(id) {
  if (NETFLIX_DATA.heroMovie.id === id) return NETFLIX_DATA.heroMovie;
  return NETFLIX_DATA.catalog.find(item => item.id === id) || null;
}
