import { useBooks } from '../../contexts/BooksContext';
import { useCategories } from '../../contexts/CategoriesContext';
import styled from 'styled-components';

export const Books = () => {
  const { books, loading, error, deleteBook } = useBooks();
  const { categories } = useCategories();

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(id);
      } catch (err) {
        // Erro tratado no context
      }
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
        {books.map(book => (
          <BookCard key={book.id}>
            <BookTitle>{book.title}</BookTitle>

            {book.coverImage && (
              <Cover 
              src={`${book.coverImage}`} 
              alt={`Capa de ${book.title}`}  
            />
            )}

            {book.description && <Description>{book.description}</Description>}

            {book.rating !== null && book.rating !== undefined && (
              <InfoText>Avaliação: {book.rating} / 5</InfoText>
            )}

            {book.startDate && (
              <InfoText>Início: {new Date(book.startDate).toLocaleDateString()}</InfoText>
            )}

            {book.finishDate && (
              <InfoText>Fim: {new Date(book.finishDate).toLocaleDateString()}</InfoText>
            )}

            {book.categories.length > 0 && (
              <InfoText>
                Categorias: {book.categories.map(cat => getCategoryName(cat.categoryId)).join(', ')}
              </InfoText>
            )}

            <Actions>
              <DeleteButton onClick={() => handleDelete(book.id)}>Excluir</DeleteButton>
              {/* <EditLink to={`/books/edit/${book.id}`}>Editar</EditLink> */}
            </Actions>
          </BookCard>
        ))}
      </BooksGrid>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: transparent;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const BooksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BookCard = styled.div`
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
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

const Description = styled.p`
  font-size: 0.9rem;
  color: #ccc;
`;

const InfoText = styled.div`
  font-size: 0.85rem;
  color: #aaa;
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

