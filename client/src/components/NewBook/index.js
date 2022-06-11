import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../../utils/queries';

export const NewBook = ({ show }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <legend>New Book</legend>
        <label htmlFor="title">
          Title{' '}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
            required
          />
        </label>
        <label htmlFor="author">
          Author{' '}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
            required
          />
        </label>
        <label htmlFor="published">
          Published{' '}
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
            name="published"
          />
        </label>
        <label htmlFor="genre">
          Genre{' '}
          <input
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            name="genre"
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </label>
        <p>Genres: {genres.join(' ')}</p>
        <button type="submit">Create a book</button>
      </fieldset>
    </form>
  );
};
