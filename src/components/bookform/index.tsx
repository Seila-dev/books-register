import React, { useState, useEffect, FormEvent } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { useCategories } from '../../contexts/CategoriesContext';
import { Book } from '../../types/bookData';

interface BookFormProps {
  book?: Book;
  onSuccess?: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ book, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<string | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const { createBook, updateBook, loading } = useBooks();
  const { categories } = useCategories();
  
  // Preencher o formulário se estiver editando um livro existente
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setDescription(book.description || '');
      setRating(book.rating || undefined);
      setStartDate(book.startDate || undefined);
      setFinishDate(book.finishDate || undefined);
      setSelectedCategories(book.categories.map(cat => cat.categoryId));
    }
  }, [book]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (book) {
        // Atualizando livro existente
        await updateBook({
          id: book.id,
          title,
          description: description || undefined,
          rating,
          startDate,
          finishDate,
          coverImage: coverFile || undefined,
          categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
        });
      } else {
        // Criando novo livro
        await createBook({
          title,
          description: description || undefined,
          rating,
          startDate,
          finishDate,
          coverImage: coverFile || undefined,
          categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
        });
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setCoverFile(null);
      setRating(undefined);
      setStartDate(undefined);
      setFinishDate(undefined);
      setSelectedCategories([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Erro já tratado no context
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="cover">Capa</label>
        <input
          id="cover"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {book?.coverImage && !coverFile && (
          <div>
            <p>Imagem atual:</p>
            <img src={`http://localhost:3333/files/${book.coverImage}`} alt="Capa atual" style={{ width: '100px' }} />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="rating">Avaliação (0-5)</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="5"
          value={rating !== undefined ? rating : ''}
          onChange={e => setRating(e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
      
      <div>
        <label htmlFor="startDate">Data de início</label>
        <input
          id="startDate"
          type="date"
          value={startDate || ''}
          onChange={e => setStartDate(e.target.value || undefined)}
        />
      </div>
      
      <div>
        <label htmlFor="finishDate">Data de conclusão</label>
        <input
          id="finishDate"
          type="date"
          value={finishDate || ''}
          onChange={e => setFinishDate(e.target.value || undefined)}
        />
      </div>
      
      <div>
        <label>Categorias</label>
        <div>
          {categories.map(category => (
            <div key={category.id}>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : book ? 'Atualizar Livro' : 'Adicionar Livro'}
      </button>
    </form>
  );
};