import styled from 'styled-components';

const Chip = ({
  text,
  clickHandler,
  cancelButton,
}: {
  text: string;
  clickHandler: Function;
  cancelButton: Boolean;
}) => {
  return (
    <Container cancelButton={cancelButton} onClick={() => clickHandler()}>
      <Textcontainer>
        <Span cancelButton={cancelButton}>{text}</Span>
        <Button cancelButton={cancelButton}>
          <p>x</p>
        </Button>
      </Textcontainer>
    </Container>
  );
};

export default Chip;

const Container = styled.div<{ cancelButton: Boolean }>`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 0 10px;
  border-radius: 32px;
  font: 15px Roboto, sans-serif;
  color: black;
  height: 22px;
  box-shadow: ${({ theme }) => theme.shadow.oneDp};
`;

const Textcontainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Span = styled.span<{ cancelButton: Boolean }>`
  margin-right: ${({ cancelButton }) => (cancelButton === false ? '0' : '4px')};
`;

const Button = styled.button<{ cancelButton: Boolean }>`
  display: ${({ cancelButton }) =>
    cancelButton === false ? 'none' : 'inline'};
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 0;
  margin-right: -7px;
  line-height: 18px;
  text-align: center;
`;
