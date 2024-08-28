import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { removeBook, setBooks, toggleLike } from '../components/Store/booksSlice';
import { RootState } from '../components/Store/store';
import BookCard from './BookCard/BookCard';


const Index = () => {

  const books = useSelector((state: RootState) => state.books.books);
  const [loading, setLoading] = useState(false);
  const [filterLiked, setFilterLiked] = useState(false);
  const dispatch = useDispatch();
  const getBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://openlibrary.org/search.json?title=the+lord+of+the+rings");
      const data = await response.json();

      const booksWithCovers = data.docs.map((book: any) => ({
        ...book,
        cover_img: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://via.placeholder.com/150',
        liked: false,
      }));

      dispatch(setBooks(booksWithCovers));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleToggleLike = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(toggleLike(key));
  };

  const handleRemoveBook = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(removeBook(key));
  };

  const toggleFilter = () => {
    setFilterLiked((prev) => !prev);
  };

  useEffect(() => {
    getBooks();
  }, [getBooks]);


  if (loading)
    return (
      <div className="loader-container">
        <ClipLoader size={50} color="#007bff" />
      </div>
    );

  const displayedBooks = filterLiked ? books.filter((book) => book.liked) : books;

  return (
      <div className="button-wrapper">
        <button onClick={toggleFilter} className="filter-button">
          {filterLiked ? "Показать все книги" : "Показать только залайканные"}
        </button>
            <div className="container">
              {displayedBooks.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onToggleLike={handleToggleLike}
                  onRemoveBook={handleRemoveBook}
                />
              ))}
            </div>
        </div>

    )
}

export default Index;
