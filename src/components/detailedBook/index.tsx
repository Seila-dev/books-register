import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBooks } from '../../contexts/BooksContext';
import { Book } from '../../types/bookData';
import { StarRating } from '../StarRating';

// Componente principal
const BookPage = () => {
  const { bookId } = useParams();
  const { getBookById, loading, error, updateBookRating } = useBooks();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        const fetchedBook = await getBookById(bookId);
        if (fetchedBook) {
          setBook(fetchedBook);
        } else {
          setBook(null); // ou trate o erro de outra forma
        }
      }
    };
  
    fetchBook();
  }, [bookId, getBookById]);

  const handleBack = () => {
    navigate('/');
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleRatingChange = async (newRating: number) => {
    if (!book) return;

    const originalRating = book.rating ?? 0;

    setBook({ ...book, rating: newRating });

    try {
      await updateBookRating(book.id, newRating);
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      setBook({ ...book, rating: originalRating });
    }
  };

  if (loading) return <LoadingMessage>Carregando detalhes do livro...</LoadingMessage>;

  if (error || !book) {
    return (
      <ErrorContainer>
        <ErrorMessage>Erro ao carregar o livro</ErrorMessage>
        <BackButtonSmall onClick={handleBack}>Voltar à página inicial</BackButtonSmall>
      </ErrorContainer>
    );
  }

  const startDateFormatted = formatDate(book.startDate ?? undefined);
  const finishDateFormatted = formatDate(book.finishDate ?? undefined);

  return (
    <PageContainer>
      {/* Header com título do livro */}
      <BookHeader>
        <HeaderContent>
          <BackButton onClick={handleBack}>
            <BackIcon viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </BackIcon>
            Voltar
          </BackButton>
          <BookTitle>{book.title}</BookTitle>
        </HeaderContent>
      </BookHeader>

      <ContentWrapper>
        <MainContent>
          <MainSection>
            <CoverSection>
              <CoverWrapper>
                <BookCover
                  src={book.coverImage || 'https://via.placeholder.com/300x450'}
                  alt={book.title}
                />
                {book.rating && <RatingBadge>{book.rating}/5</RatingBadge>}
              </CoverWrapper>

              <ActionButtons>
                <StarRating
                  rating={book.rating || 0}
                  onRate={handleRatingChange}
                />
              </ActionButtons>
            </CoverSection>

            <DetailsSection>
              <MetadataSection>
                <MetadataBadge>
                  <CalendarIcon viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </CalendarIcon>
                  Adicionado em: {formatDate(book.createdAt)}
                </MetadataBadge>

                {startDateFormatted && (
                  <MetadataBadge>
                    <ClockIcon viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </ClockIcon>
                    Início da leitura: {startDateFormatted}
                  </MetadataBadge>
                )}

                {finishDateFormatted && (
                  <MetadataBadge>
                    <CheckIcon viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </CheckIcon>
                    Concluído em: {finishDateFormatted}
                  </MetadataBadge>
                )}
              </MetadataSection>

              {book.categories && book.categories.length > 0 && (
                <CategorySection>
                  <SectionTitle>Categorias</SectionTitle>
                  <CategoryContainer>
                    {book.categories.map((cat, index) => (
                      <CategoryTag key={index}>
                        {cat.category.name}
                      </CategoryTag>
                    ))}
                  </CategoryContainer>
                </CategorySection>
              )}
            </DetailsSection>
          </MainSection>

          {book.description && (
            <DescriptionCard>
              <SectionTitle>Descrição</SectionTitle>
              <Description>{book.description}</Description>
            </DescriptionCard>
          )}

          {(startDateFormatted || finishDateFormatted) && (
            <ProgressCard>
              <SectionTitle>Progresso de Leitura</SectionTitle>
              <ProgressBarContainer>
                <ProgressBarWrapper>
                  <ProgressBar progress={finishDateFormatted ? 100 : startDateFormatted ? 50 : 0} />
                </ProgressBarWrapper>
                <ProgressStatus>
                  {!startDateFormatted && !finishDateFormatted && 'Não iniciado'}
                  {startDateFormatted && !finishDateFormatted && 'Em andamento'}
                  {finishDateFormatted && 'Concluído'}
                </ProgressStatus>
              </ProgressBarContainer>
              <ProgressInfo>
                {startDateFormatted && (
                  <ProgressItem>
                    <ProgressLabel>Início:</ProgressLabel>
                    <ProgressValue>{startDateFormatted}</ProgressValue>
                  </ProgressItem>
                )}
                {finishDateFormatted && (
                  <ProgressItem>
                    <ProgressLabel>Conclusão:</ProgressLabel>
                    <ProgressValue>{finishDateFormatted}</ProgressValue>
                  </ProgressItem>
                )}
              </ProgressInfo>
            </ProgressCard>
          )}
        </MainContent>

        <SidebarContent>
          <RecommendationsCard>
            <SectionTitle>Você também pode gostar</SectionTitle>
            <p>Baseado em seus interesses</p>
          </RecommendationsCard>
        </SidebarContent>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #fdfdfd;
  min-height: 100vh;
  color: #2c2c2c;
  font-family: 'Roboto', sans-serif;
`;

const BookHeader = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarContent = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 300px;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CoverSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const CoverWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`;

const BookCover = styled.img`
  min-width: 210px;
  min-height: 315px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e27d60;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: black;
  padding: 10px;
  width: 100%;
`;

const DetailsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BookTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const MetadataSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const MetadataBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f1f1f1;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #666;
`;

const CategorySection = styled.div`
  margin-top: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #e27d60;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryTag = styled.span`
  background-color: #f9f9f9;
  color: #e27d60;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  display: inline-block;
  border: 1px solid #e0e0e0;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const DescriptionCard = styled(Card)`
  margin-top: 1rem;
`;

const Description = styled.p`
  line-height: 1.6;
  color: #ddd;
`;

const ProgressCard = styled(Card)`
  margin-top: 1rem;
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressBarWrapper = styled.div`
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #e27d60;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressStatus = styled.div`
  font-size: 0.875rem;
  color: #ccc;
  text-align: right;
`;

const ProgressInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: #2c2c2c;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const ProgressLabel = styled.span`
  color: #666;
`;

const ProgressValue = styled.span`
  font-weight: bold;
`;

const RecommendationsCard = styled(Card)`
  height: 100%;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #e27d60;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #c85a49;
  }
`;

const BackButtonSmall = styled(BackButton)`
  padding: 0.75rem 1rem;
  background-color: #e27d60;
  color: white;
  border-radius: 4px;

  &:hover {
    background-color: #c85a49;
  }
`;


const Icon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

const BackIcon = styled(Icon)``;
const CalendarIcon = styled(Icon)``;
const ClockIcon = styled(Icon)``;
const CheckIcon = styled(Icon)``;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.25rem;
  color: #f47521;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  font-size: 1.25rem;
  color: #f47521;
`;

export default BookPage;