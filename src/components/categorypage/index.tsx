import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api"
import styled from "styled-components"

interface Category {
    id: number;
    name: string;
}

export const CategoryPage = () => {
    const { id } = useParams()
    const [categories, setCategories] = useState<Category[]>([])

    const getProducts = async () => {
        const response = await api.get(`/categories/${id}`)
        setCategories(response.data)
    }

    useEffect(() => {
        if (id){
            getProducts()
        }
    }, [id])

    useEffect(() => {
        console.log(categories)
    }, [categories])

    if (!categories){
       return <Loading>Categoria não encontrada</Loading>
    } 

    return (
        <>
            <div>
                <h1>Estou funcionando
                </h1>
            </div>
        </>
    )
}

const Loading = styled.div`
    height: 80vh;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`