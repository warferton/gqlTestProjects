import React from 'react';
import styled from '@emotion/styled';

const SearchForm = styled.div`
    display: flex;
    align-items:center:
    > button {
        margin-left: 1rem;
    }
`;

export default function Search({inputVal, onChange, onSearch}){
    return (
        <SearchForm>
            <input type='text' value={inputVal} onChange={onChange}/>
            <button type='button' onClick={onSearch}>Find</button>
        </SearchForm>
    )
}