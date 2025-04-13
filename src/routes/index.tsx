import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages";
import { Home } from "../components/Home";
import { SignUp } from "../components/signUp";
import { SignIn } from "../components/signIn";
import BookPage from "../components/detailedBook";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route index element={<Home />} />
                <Route path="/book/:bookId" element={<BookPage />} />
            </Route>
            <Route path="register" element={<SignUp />} />
            <Route path="login" element={<SignIn />} />
        </Routes>
    )
}