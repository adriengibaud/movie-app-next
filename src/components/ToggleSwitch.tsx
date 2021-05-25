import styled from 'styled-components';

const ToggleSwitch = ({
  actived,
  clickHandler,
}: {
  actived: boolean;
  clickHandler: Function;
}) => {
  return (
    <Container onClick={() => clickHandler()}>
      <Label actived={actived}>
        <Input />
        <div></div>
      </Label>
    </Container>
  );
};

export default ToggleSwitch;

const Container = styled.button`
  background: none;
  border: none;
`;

const Label = styled.label<{ actived: boolean }>`
  display: inline-block;
  font-size: 20px;
  height: 1em;
  width: 2em;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 1em;
  div {
    height: 1em;
    width: 1em;
    border-radius: 1em;
    background: #fff;
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
    -webkit-transition: all 300ms;
    -moz-transition: all 300ms;
    transition: all 300ms;
    transform: ${({ actived }) => actived && 'translate3d(100%, 0, 0)'};
  }
`;

const Input = styled.div`
  position: absolute;
  opacity: 0;
`;
