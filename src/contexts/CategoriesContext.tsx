import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { Category } from '../types/categoryData';
import { parseCookies } from 'nookies';

interface CreateCategoryData {
  name: string;
}

interface UpdateCategoryData {
  id: string;
  name: string;
}

interface CategoryContextData {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<Category | undefined>;
  createCategory: (data: CreateCategoryData) => Promise<Category>;
  updateCategory: (data: UpdateCategoryData) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextData>({} as CategoryContextData);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 'books-register.token': token } = parseCookies()
  
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Category[]>('/categories', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setCategories(response.data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      setError('Não foi possível carregar suas categorias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const getCategoryById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get<Category>(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar categoria:', err);
      setError('Não foi possível carregar a categoria. Tente novamente mais tarde.');
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const createCategory = useCallback(async (data: CreateCategoryData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<Category>('/categories', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      
      setCategories(prevCategories => [...prevCategories, response.data]);
      
      return response.data;
    } catch (err: any) {
      console.error('Erro ao criar categoria:', err);
      setError(err.response?.data?.error || 'Não foi possível criar a categoria. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateCategory = useCallback(async (data: UpdateCategoryData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put<Category>(`/categories/${data.id}`, { name: data.name }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === data.id ? response.data : category
        )
      );
      
      return response.data;
    } catch (err: any) {
      console.error('Erro ao atualizar categoria:', err);
      setError(err.response?.data?.error || 'Não foi possível atualizar a categoria. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const deleteCategory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      
      setCategories(prevCategories => 
        prevCategories.filter(category => category.id !== id)
      );
    } catch (err: any) {
      console.error('Erro ao excluir categoria:', err);
      setError(err.response?.data?.error || 'Não foi possível excluir a categoria. Tente novamente mais tarde.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Carregar categorias automaticamente quando o componente for montado
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategories(): CategoryContextData {
  const context = useContext(CategoryContext);
  
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  
  return context;
}