import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from 'utils/queries';

export const Authors = ({ show, authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState();

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: born } });

    setName('');
    setBorn(0);
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <h1>Authors</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <legend>Set Bithyear</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              name="name"
              reqiured
            />
          </label>
          <label htmlFor="born">
            Born
            <input
              type="text"
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
              name="born"
              reqiured
            />
          </label>
          <button type="submit">Update author</button>
        </fieldset>
      </form>
    </>
  );
};
