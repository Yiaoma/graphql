import { useQuery } from '@apollo/client';
import { Authors, Books, NewBook } from 'components';
import { useState } from 'react';
import { ALL_AUTHORS, ALL_BOOKS } from 'utils/queries';

export const App = () => {
  const [page, setPage] = useState('newBook');
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('newBook')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'newBook'} />
    </main>
  );
};
