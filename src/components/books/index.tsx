import { useBooks } from '../../contexts/BooksContext';
import styled from 'styled-components';
import { StarRating } from '../StarRating';
import { Link } from 'react-router-dom';

export const Books = () => {
  const { books, loading, error, deleteBook, updateBookRating } = useBooks();
  // const { categories } = useCategories();

  // const getCategoryName = (categoryId: string) => {
  //   const category = categories.find(cat => cat.id === categoryId);
  //   return category ? category.name : '';
  // };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(id);
      } catch (err) {
        // Erro tratado no context
      }
    }
  };

  const handleRatingChange = async (bookId: string, newRating: number) => {
    // Encontre o livro correspondente ao ID
    const bookToUpdate = books.find(b => b.id === bookId);

    if (!bookToUpdate) {
      console.error('Erro: Livro não encontrado');
      return;
    }

    // Atualiza a avaliação de forma otimista no estado local
    const originalRating = bookToUpdate.rating;
    bookToUpdate.rating = newRating;

    try {
      // Atualiza a avaliação no backend
      await updateBookRating(bookId, newRating);
    } catch (error) {
      // Se ocorrer um erro, reverte para a avaliação anterior
      bookToUpdate.rating = originalRating;
    }
  };

  if (loading) return <StatusMessage>Carregando livros...</StatusMessage>;
  if (error) return <StatusMessage>Erro: {error}</StatusMessage>;
  if (books.length === 0)
    return <StatusMessage>Nenhum livro encontrado. Adicione seu primeiro livro!</StatusMessage>;

  return (
    <Container>
      <Title>Meus Livros</Title>
      <BooksGrid>
        {books.map((book) => (
          <BookCard key={book.id}>
              <BookTitle>{book.title}</BookTitle>

            {book.coverImage && (
              <Cover 
                src={`${book.coverImage}`} 
                alt={`Capa de ${book.title}`}  
              />
            )}

            <StarRating 
              rating={book.rating || 0} 
              onRate={(newRating) => handleRatingChange(book.id, newRating)} 
            />

            <Actions>
              <DeleteButton onClick={() => handleDelete(book.id)}>Excluir</DeleteButton>
              <VisualizeButton to={`/book/${book.id}`}>Visualizar</VisualizeButton>
            </Actions>
          </BookCard>
        ))}
      </BooksGrid>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: transparent;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-size: 24px;

  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

const BooksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BookCard = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  background: transparent;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const Cover = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #c62828;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #b71c1c;
  }
`;

const StatusMessage = styled.div`
  padding: 20px;
  font-size: 1rem;
  color: #ddd;
`;

const VisualizeButton = styled(Link)`
  padding: 6px 12px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
  display: block;
  text-align: center;
  &:hover {
    background-color: #1565c0;
  }
  &:active {
    background-color: #0d47a1;
  }
  &:focus {
    outline: none;
  }
`