import { useEffect, useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loader/Loader";

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  cover_img: string;
  liked?: boolean;
}

const Index = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterLiked, setFilterLiked] = useState(false);
  const navigate = useNavigate();

  const getBooks = async () => {
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

      setBooks(booksWithCovers);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.key === key ? { ...book, liked: !book.liked } : book
      )
    );
  };

  const removeBook = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setBooks((prevBooks) => prevBooks.filter((book) => book.key !== key));
  };

  const toggleFilter = () => {
    setFilterLiked((prev) => !prev);
  };

  useEffect(() => {
    getBooks();
  }, []);

  console.log(books);
  if (loading) return <Loading />;
  const displayedBooks = filterLiked ? books.filter((book) => book.liked) : books;

  return (
      <div>
        <button onClick={toggleFilter} className="filter-button">
          {filterLiked ? "Показать все книги" : "Показать только залайканные"}
        </button>
            <div className="container">
                {
                    displayedBooks.map((book) => {
                      return (
                        <div className="card_item"
                          key={book.key}
                          onClick={() => navigate(`/book${book.key}`)}
                        >
                                <div className="card_inner">
                                {/* <Link to={`/book${book.key}`}> */}
                                    <img src={book.cover_img} alt={book.title} />
                                {/* </Link> */}
                                    <div className="userName">{book.title}</div>
                                    <div className="userUrl">{book.author_name}</div>
                                    <div className="icon-buttons">
                                      <FaHeart
                                        onClick={(event) => toggleLike(book.key, event)}
                                        style={{ color: book.liked ? 'red' : 'gray', cursor: 'pointer' }}
                                      />
                                      <FaTrash
                                        onClick={(event) => removeBook(book.key, event)}
                                        style={{ color: 'black', cursor: 'pointer', marginLeft: '10px' }}
                                      />
                                    </div>
                                    <button className="seeMore">See More</button>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>

    )
}

export default Index;
