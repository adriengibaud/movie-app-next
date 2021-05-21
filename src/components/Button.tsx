import styled from 'styled-components';

const Button = ({
  text,
  clickHandler,
}: {
  text: string | JSX.Element;
  clickHandler: Function;
}) => {
  return <Container onClick={() => clickHandler()}>{text}</Container>;
};

export default Button;

const Container = styled.button`
  background: transparent;
  font: 1.3rem Roboto, sans-serif;
  padding: 10px 5px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;
