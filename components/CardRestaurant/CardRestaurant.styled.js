import styled from 'styled-components';

const SCCardRestaurant = styled.article`
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(112, 112, 112, 1);
	-moz-box-shadow: 0px 0px 5px 1px rgba(112, 112, 112, 1);
	box-shadow: 0px 0px 10px 0px rgba(112, 112, 112, 0.4);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
		transform: scale(1.1);
	}

    img{
        object-fit: cover;
    }
    h4{
        width: 90%;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis;
        text-align: center;
    }
`;

export default SCCardRestaurant;