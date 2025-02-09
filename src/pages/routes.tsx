import { Route, Routes } from "react-router-dom";
import { MainPage } from "../mainpage";
import { Page } from "./page";
import { Home } from "../components/home";
import { NewPageUrl } from "./newpage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Page />} />
                <Route path="/new-product" element={<NewPageUrl />} />
            </Route>
        </Routes>
    )
}