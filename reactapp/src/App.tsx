import { Container } from '@mui/system';
import './App.css';
import { SampleReactHookForm } from './components/SampleReactHookForm';
import { SampleYupForm } from './components/SampleYupForm';

function App() {
  return (
    <Container style={{paddingTop: 10}}>
      <SampleReactHookForm />
      <SampleYupForm />
    </Container>
  );
}

export default App;
