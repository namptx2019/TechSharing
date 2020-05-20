import styled from "styled-components";

// Create a Title component that'll render an <h1> tag with some styles
const StyledContainer = styled.main`
  padding: 30px;
  margin: 24px auto;
  max-width: 580px;

  background-color: white;

  button {
    display: flex;
    margin: 24px 0 16px;
    padding: 16px 24px;
    width: 100%;

    background-color: rebeccapurple;
    border: none;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    color: white;
    cursor: pointer;
    font-weight: 700;
    line-height: 1;
    outline: none;
    text-align: left;
    text-decoration: none;
    text-transform: capitalize;
    transition: all 0.15s ease;
    white-space: nowrap;
    width: auto;

    &:active,
    &:focus,
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    }
  }

  button,
  input,
  label,
  textarea {
    border-radius: 3px;
  }

  input,
  label,
  textarea {
    display: block;
    width: 100%;
  }

  input,
  textarea {
    padding: 16px;

    border: 1px solid #ccc;

    & + & {
      margin-top: 16px;
    }
  }

  label {
    margin: 16px 0 8px;
    font-weight: 500;
    text-transform: capitalize;
  }

  h1 {
    margin-top: 0;
  }

  .error {
    display: block;
    margin-bottom: 24px;
    margin-top: 8px;

    color: red;
    font-size: 1.4rem;
  }

  .strength-meter {
    label {
      padding: 4px 0;
    }

    svg {
      margin-right: 8px;
      fill: lightgrey;
      transition: 0.2s fill ease;
    }

    .valid {
      svg {
        fill: rebeccapurple;
      }
    }
  }
`;

export default StyledContainer;
