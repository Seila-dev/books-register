
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/index.tsx"
import { AuthProvider } from "./contexts/AuthContext.tsx"
import { CategoryProvider } from "./contexts/CategoriesContext.tsx"
import { BooksProvider } from "./contexts/BooksContext.tsx"

function App() {

  return (
    <>
      <BrowserRouter >
        <AuthProvider>
          <CategoryProvider>
            <BooksProvider>
              <AppRoutes />
            </BooksProvider>
          </CategoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
