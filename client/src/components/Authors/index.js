import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

export const Authors = ({ authors }) => {
  console.log(authors);

  return (
    <>
      <button>authors</button>
      <button>books</button>
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
    </>
  );
};
