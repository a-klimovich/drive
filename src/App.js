// COMPONENTS
import Header from "./components/layout/Header";
import FileTable from './components/fileTable';
import Container from "./components/helpers/Container";

function App() {
  return (
    <div className="App">
      <Header
        userName={'Иван Иванович'}
      />

      <Container>
        <FileTable />
      </Container>
    </div>
  );
}

export default App;
