import { gql, useQuery } from '@apollo/client';
import { Authors, Books } from 'components';
import { useState } from 'react';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const All_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

export const App = () => {
  const [page, setPage] = useState('authors');
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(All_BOOKS);

  // console.log(authors);
  // console.log(books);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />
    </main>
  );
};
