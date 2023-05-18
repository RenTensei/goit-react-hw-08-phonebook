import styled from '@emotion/styled';

export const GlobalStyles = styled.main`
  font-size: 18px;

  label {
    * {
      display: block;
    }
  }
  margin: 0 auto;
  margin-top: 150px;

  background: #efeff5;
  border-radius: 16px;

  width: 440px;
  overflow: hidden;
  padding: 48px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);

  .form-label {
    color: #676771;
  }

  * {
    margin: 0;
  }

  input {
    margin: 12px 0px;
    padding: 6px 12px;
    border-radius: 12px;

    border: 1px solid #1e1e1e;
    color: #777783;
  }

  h2 {
    margin-bottom: 24px;
  }

  button {
    margin-top: 24px;
    padding: 10px 30px;
    background-color: #063970;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 600;

    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    transition: all 0.2s;

    border: none;
  }

  button:hover {
    box-shadow: 0 10px 30px 0 rgba(189, 89, 212, 0.8);
  }

  button:active {
    box-shadow: none;
  }

  ul {
    list-style: circle;
    padding: 0;
  }

  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 16px;

    button {
      margin: 0;
    }
  }
`;
