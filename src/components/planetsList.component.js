import React from 'react'
import {useQuery, gql} from '@apollo/client'
import {Link} from 'react-router-dom'

const PLANETS = gql`
    {
    planets {
        name
        colour
        id
    }
}
`;

export default function Planets({newPlanets}){
    const {loading, error, data} = useQuery(PLANETS);

    if(loading) return <div><p>Loading...</p></div>;
    if(error) return <div><p>Error : ( [{error.message}] )</p></div>;

    const renderPlanets = (planets) => {
        return planets.map(({id, name, colour}) => 
            (
                <Link to={`/planet/${id}`} key={id}>
                    <div>
                        <p>
                            {name} | {colour}
                        </p>
                    </div>
                </Link>
            )
        )};

    return( 
        <ul>
            {renderPlanets(newPlanets || data.planets)}
        </ul> 
    );
}