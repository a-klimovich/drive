// COMPONENTS
import Header from "./components/layout/Header";
import FileTable from './components/fileTable';
import Container from "./components/helpers/Container";
// import fileTypeIcone from "./components/UI/icons/files";
// import folderIcon from "./components/UI/icons/folder";
// import decorIcon from "./components/UI/icons/decore";
// 

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
