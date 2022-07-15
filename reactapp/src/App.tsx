import { Container } from '@mui/system';
import './App.css';
// import { SampleReactHookForm } from './components/SampleReactHookForm';
// import { SampleYupForm } from './components/SampleYupForm';
import { QA001 } from './components/QA001';

function App() {
  return (
    <Container style={{paddingTop: 10}}>
      {/* <SampleReactHookForm />
      <SampleYupForm /> */}
      <QA001 />
    </Container>
  );
}

export default App;
