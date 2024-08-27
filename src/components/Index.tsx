import { useEffect, useState } from 'react';

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  cover_img: string;
}

const Index = () => {

   const [books, setBooks] = useState<Book[]>([]);

    const getBooks = async () => {
      const response = await fetch("https://openlibrary.org/search.json?title=the+lord+of+the+rings");
      const data = await response.json();
      // setBooks(data.docs);
      const booksWithCovers = data.docs.map((book: any) => {
        return {
          ...book,
          cover_img: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : 'https://via.placeholder.com/150',
        };
      });

      setBooks(booksWithCovers);
    };

  useEffect(() => {
    getBooks();
  }, []);

  console.log(books);

    return (

            <div className="container">
                {
                    books.map((book) => {
                      return (
                            <div className="card_item" key={book.key}>
                                <div className="card_inner">
                                    <img src={book.cover_img} alt={book.title} />
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
