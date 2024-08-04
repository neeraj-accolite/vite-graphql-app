import './style.css';
import { useQuery } from '@apollo/client';
import { GET_PROFILE_LIST_DATA } from '../../gql/profileListGql';

export default function ProfilePage() {

  const {data: data, loading, error} = useQuery(GET_PROFILE_LIST_DATA);

  console.warn(data);

  return (
    <div id="container">
      <h1> GraphQL Application </h1>
      <div>
          {
          loading?
          <div id="loader"></div>
          :
          <div>Details Loaded </div>
          }
        </div>
    </div>
  );
}
