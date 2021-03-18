import React, {useState} from 'react';
import {useLazyQuery, gql} from '@apollo/client'
import Planets from './planetsList.component'
import Search from './searchForm.component';


const SEARCH_QUERY = gql`
    query MyQuery($match: String){
        planets(where: {name: {_ilike: $match}}) {
            name
            colour
            id
        }
    }
`;


export default function PlatenSearch(){

    const [inputValue, setInput] = useState('');
    const [search, {loading, error, data}] = useLazyQuery(SEARCH_QUERY);

    return(
    <>
        <Search
            inputValue={inputValue}
            onChange={(e) => setInput(e.target.value)}
            onSearch={() => search({variables : {match : `%${inputValue}%`}})} 
        />
        {loading ? <p>Searching...</p> : <Planets newPlanets={data ? data.planets : null}/>}
    </>
    )
}