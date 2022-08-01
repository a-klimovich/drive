// COMPONENTS
import Header from "./components/layout/Header";
import FileTable from './components/fileTable';

function App() {
  
  return (
    <div className="App">
      <Header
        userName={'Иван Иванович'}
      />

      <FileTable />
    </div>
  );
}

export default App;
