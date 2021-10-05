import styled from 'styled-components';

export const StyledRow = styled.div`
    display:flex;
    flex-direction:row;

`
export const StyledGrid = styled.div`
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1px;
    position: relative;
`;

export const StyledButton = styled.button`
    background: #6ac045;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    display: block;
    font-weight: bold;
    color: #fff;
    top: 35px;
    font-size: 16px;
    position: relative;
    width: 130px;
    padding: 7px 0;
    margin: 0 auto;
    -webkit-transition: all 300ms ease;
    -moz-transition: all 300ms ease;
    transition: all 300ms ease;
    &:focus {
        color: #fff
    }
    &:hover {
        color: #fff
    }

`
export const StyledButton2 = styled.button`
     width: 100%;
    position: static;
    margin: 5px 0;
    text-align: center;
    border: 0;
    padding: 3px

`
export const Styledheading4 = styled.h4`
    margin-bottom: 20px;
    font-size: 25px;
    position: relative;
    width: 100%;
    padding-left: 0!important;
    padding-right: 0!important;
    font-weight: bold;
    color: #EEE;
`