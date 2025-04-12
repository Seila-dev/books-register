import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { Book, CreateBookData, UpdateBookData } from '../types/bookData';
import { parseCookies } from 'nookies';

interface BooksContextData {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  fetchBooksByCategory: (categoryId: string) => Promise<void>;
  getBookById: (id: string) => Promise<Book | undefined>;
  createBook: (data: CreateBookData) => Promise<Book>;
  updateBook: (data: UpdateBookData) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  coverUrlPrefix: string;
}

const BooksContext = createContext<BooksContextData>({} as BooksContextData);

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 'books-register.token': token } = parseCookies()
  
  // Prefixo da URL para imagens de capa
  const coverUrlPrefix = 'https://books-register-api-production.up.railway.app/public/'
  
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Book[]>('/books', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Erro ao buscar livros:', err);
      setError('Não foi possível carregar seus livros. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const fetchBooksByCategory = useCallback(async (categoryId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Book[]>(`/books/category/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Erro ao buscar livros por categoria:', err);
      setError('Não foi possível carregar os livros desta categoria. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const getBookById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Book>(`/books/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar livro:', err);
      setError('Não foi possível carregar o livro. Tente novamente mais tarde.');
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const createBook = useCallback(async (data: CreateBookData) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      
      if (data.description) {
        formData.append('description', data.description);
      }
      
      if (data.rating !== undefined) {
        formData.append('rating', String(data.rating));
      }
      
      if (data.startDate) {
        formData.append('startDate', data.startDate);
      }
      
      if (data.finishDate) {
        formData.append('finishDate', data.finishDate);
      }
      
      if (data.coverImage) {
        formData.append('coverImage', data.coverImage);
      }
      
      if (data.categoryIds && data.categoryIds.length > 0) {
        formData.append('categoryIds', JSON.stringify(data.categoryIds));
      }
      
      const response = await api.post<Book>('/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
      });
      
      setBooks(prevBooks => [...prevBooks, response.data]);
      
      return response.data;
    } catch (err: any) {
      console.error('Erro ao criar livro:', err);
      setError(err.response?.data?.error || 'Não foi possível criar o livro. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateBook = useCallback(async (data: UpdateBookData) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      if (data.title) {
        formData.append('title', data.title);
      }
      
      if (data.description !== undefined) {
        formData.append('description', data.description || '');
      }
      
      if (data.rating !== undefined) {
        formData.append('rating', String(data.rating));
      }
      
      if (data.startDate !== undefined) {
        formData.append('startDate', data.startDate || '');
      }
      
      if (data.finishDate !== undefined) {
        formData.append('finishDate', data.finishDate || '');
      }
      
      if (data.coverImage) {
        formData.append('coverImage', data.coverImage);
      }
      
      if (data.categoryIds) {
        formData.append('categoryIds', JSON.stringify(data.categoryIds));
      }
      
      const response = await api.put<Book>(`/books/${data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
      });
      
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === data.id ? response.data : book
        )
      );
      
      return response.data;
    } catch (err: any) {
      console.error('Erro ao atualizar livro:', err);
      setError(err.response?.data?.error || 'Não foi possível atualizar o livro. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const deleteBook = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(`/books/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      
      setBooks(prevBooks => 
        prevBooks.filter(book => book.id !== id)
      );
    } catch (err: any) {
      console.error('Erro ao excluir livro:', err);
      setError(err.response?.data?.error || 'Não foi possível excluir o livro. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Carregar livros automaticamente quando o componente for montado
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  
  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        fetchBooksByCategory,
        getBookById,
        createBook,
        updateBook,
        deleteBook,
        coverUrlPrefix
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export function useBooks(): BooksContextData {
  const context = useContext(BooksContext);
  
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  
  return context;
}