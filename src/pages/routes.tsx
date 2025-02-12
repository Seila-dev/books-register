import { Route, Routes } from "react-router-dom";
import { MainPage } from "../mainpage";
import { Page } from "./page";
import { Home } from "../components/home";
import { CategoryPage } from "../components/categorypage";
import { CategoriesPage } from "../components/categoriespage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Page />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:id" element={<CategoryPage />} />
            </Route>
        </Routes>
    )
}