import React from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

interface BookCardProps {
  book: {
    key: string;
    title: string;
    cover_img: string;
    liked?: boolean;
    author_name: string[];
  };
  onToggleLike: (key: string, event: React.MouseEvent) => void;
  onRemoveBook: (key: string, event: React.MouseEvent) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onToggleLike, onRemoveBook }) => {
  const navigate = useNavigate();

  return (
    <div className="card_item" onClick={() => navigate(`/book${book.key}`)}>
      <div className="card_inner">
        <img src={book.cover_img} alt={book.title} />
        <div className="userName">{book.title}</div>
        <div className="userUrl">{book.author_name}</div>
        <div className="icon-buttons">
          <FaHeart
            onClick={(event) => onToggleLike(book.key, event)}
            style={{ color: book.liked ? 'red' : 'gray', cursor: 'pointer' }}
          />
          <FaTrash
            onClick={(event) => onRemoveBook(book.key, event)}
            style={{ color: 'black', cursor: 'pointer', marginLeft: '10px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
