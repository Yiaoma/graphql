import { gql, useQuery } from '@apollo/client';
import { Authors } from 'components';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const App = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return <Authors authors={result.data.allAuthors} />;
};
