import { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchField = ({
  handleSubmit,
  label,
}: {
  handleSubmit: Function;
  label: string;
}) => {
  const [inputText, setInputText] = useState('');
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(inputText);
  };

  return (
    <Container onSubmit={submit}>
      <Label>{label}</Label>
      <InputField
        type='text'
        placeholder='Type here'
        value={inputText}
        onChange={handleChange}
        name='inputField'
      />
      <Button type='submit'>
        <FiSearch />
      </Button>
    </Container>
  );
};

export default SearchField;

const Container = styled.form`
  position: relative;
  width: 100%;
  font: 1rem Roboto, sans-serif;
`;

const InputField = styled.input`
  width: 80%;
  border: 0;
  border-bottom: 2px solid grey;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.highText};
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  width: 20%;
  font-size: 25px;
  text-align: center;
`;
