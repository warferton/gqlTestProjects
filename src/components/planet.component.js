import React from 'react';
import {useSubscription, gql} from '@apollo/client';

const PLANET_QUERY = gql`
    subscription Planet($id : uuid!){
    planets_by_pk(id: $id) {
        name
        colour
        reviews {
            id
            body
        }
    }
    }
`;

//match in passed vals is the ':id' from the Route path string
export default function Planet({match: {params: {id}}}){
    console.log("PLANET LOADED");
    
    const {loading, error, data} = useSubscription(PLANET_QUERY, { variables: {id} });

    if(loading) return <p>Loading...</p>
    if(error) return <div>{error.message}</div>

    const {name, colour, reviews} = data.planets_by_pk;

    return(
        <div>
            <h3>{name} | {colour}</h3>
            <ul>
                {reviews.length > 0 ? 
                reviews.map(review => <li key={review.id}>{review.body}</li>)
                :
                <div><p>Nobody has reviewed this planet yet.</p></div>
                }

            </ul>
        </div>
    )
}