import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../components/Loader/Loader";

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  cover_img: string;
}

const Index = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

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
      }));

      setBooks(booksWithCovers);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  console.log(books);
  if(loading) return <Loading />;

    return (

            <div className="container">
                {
                    books.map((book) => {
                      return (
                            <div className="card_item" key={book.key}>
                                <div className="card_inner">
                                <Link to={`/book${book.key}`}>
                                    <img src={book.cover_img} alt={book.title} />
                                </Link>
                                    {/* <img src={book.cover_img} alt={book.title} /> */}
                                    <div className="userName">{book.title}</div>
                                    <div className="userUrl">{book.author_name}</div>
                                    <div className="detail-box">

                                        <div className="gitDetail"><span>Articles</span>23</div>
                                        <div className="gitDetail"><span>Following</span>45</div>
                                        <div className="gitDetail"><span>Followers</span>11</div>
                                    </div>
                                    <button className="seeMore">See More</button>
                                </div>

                            </div>
                        )
                    })
                }

            </div>


    )
}

export default Index;
