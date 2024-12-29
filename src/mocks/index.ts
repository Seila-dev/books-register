import manhwaExample from '../assets/manhwa-image.jpg'
import manhwaExample2 from '../assets/manhwa-image-2.jpeg'
import manhwaExample3 from '../assets/manhwa-image-3.jpg'

export const products = [
    {
        image: manhwaExample,
        id: 1,
    },
    {
        image: manhwaExample2,
        id: 2,
    },
    {
        image: manhwaExample3,
        id: 3,
    },
]

export const productsDetailed = [
    {
        image: manhwaExample,
        title: "O dia em que virei vilã",
        id: 1,
        stars: 4,
        genre: "Romance",
        description: "Gostei muito, nota 2",
        startedReading: "11/22/3333",
        endedReading: "22/33/4444"
    },
    {
        image: manhwaExample2,
        id: 2,
        title: "Boruto - Next Generations",
        stars: 2,
        genre: "Ação",
        description: "Odiei os personagens, mas é nostalgico. Nota 3",
        startedReading: "11/22/2033",
        endedReading: "22/33/2844"
    },
    {
        image: manhwaExample3,
        id: 3,
        title: "Blue Lock",
        stars: 5,
        genre: "Ação",
        description: "Horrível",
        startedReading: "11/22/4433",
        endedReading: "22/33/2847"
    },
]