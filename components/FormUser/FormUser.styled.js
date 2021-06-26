import styled from 'styled-components';

const SCFormUser = styled.form`
	width: 100%;
  display: flex;
  flex-direction: column;

  .form-group{
    margin-bottom: 15px;
  }
  button{
    margin-top: 20px;
    width: 100%;
    align-self: center;
  }
	
  @media (min-width: 768px) {
		width: 350px;
	}
  button{
    width: 250px;
  }
`;

export default SCFormUser;
