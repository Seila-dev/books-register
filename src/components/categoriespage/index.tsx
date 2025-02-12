import { useEffect, useState } from "react"
import api from "../../services/api"

interface Category {
    id: number;
    name: string;
}

export const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([])

    async function getCategories(){
        const response = await api.get(`/categories`)
        setCategories(response.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        console.log(categories)
    }, [categories])


    return (
        <>
            <div>
                {
                    categories.map(category => (
                        <div key={category.id}>
                            <h1>{category.name}</h1>
                        </div>
                ))}
            </div>
        </>
    )
}