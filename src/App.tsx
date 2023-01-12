import './App.css';
import styled from 'styled-components'

import Todo from './components/Todo';

function App() {
  return (
    <AppContainer>
      <Todo />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 16px;
  width: 500px;
  height: 700px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
`