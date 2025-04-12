import { useBooks } from '../../contexts/BooksContext';
import { useCategories } from '../../contexts/CategoriesContext';
import styled from 'styled-components';

export const Home = () => {
  const { books, loading, error,  deleteBook, coverUrlPrefix } = useBooks();
  const { categories } = useCategories();
  
  // Esta função busca o nome da categoria pelo ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await deleteBook(id);
      } catch (err) {
        // Erro já tratado no context
      }
    }
  };
  
  if (loading) {
    return <div>Carregando livros...</div>;
  }
  
  if (error) {
    return <div>Erro: {error}</div>;
  }
  
  if (books.length === 0) {
    return <div>Nenhum livro encontrado. Adicione seu primeiro livro!</div>;
  }
  
  return (
    <Container>
      <h2>Meus Livros</h2>
      
      <div>
        {books.map(book => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            
            {book.coverImage && (
              <img 
                src={`${coverUrlPrefix}${book.coverImage}`} 
                alt={`Capa de ${book.title}`} 
                style={{ width: '100px' }} 
              />
            )}
            
            {book.description && <p>{book.description}</p>}
            
            {book.rating !== null && book.rating !== undefined && (
              <div>Avaliação: {book.rating} / 5</div>
            )}
            
            {book.startDate && (
              <div>Início da leitura: {new Date(book.startDate).toLocaleDateString()}</div>
            )}
            
            {book.finishDate && (
              <div>Término da leitura: {new Date(book.finishDate).toLocaleDateString()}</div>
            )}
            
            {book.categories.length > 0 && (
              <div>
                Categorias: {book.categories.map(cat => getCategoryName(cat.categoryId)).join(', ')}
              </div>
            )}
            
            <div>
              <button onClick={() => handleDelete(book.id)}>Excluir</button>
              {/* Link para editar o livro */}
              {/* <Link to={`/books/edit/${book.id}`}>Editar</Link> */}
            </div>
            
            <hr />
          </div>
        ))}
      </div>
    </Container>
  );
};


const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    min-height: 100vh;
    h1 {
        color: white;
    }

    p {
        color: white;
    }
`