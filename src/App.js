// COMPONENTS
import Header from "./components/layout/Header";
import fileTypeIcone from "./components/UI/icons/Files";
import folderIcon from "./components/UI/icons/Folder";
import decorIcon from "./components/UI/icons/Decore";
import Title from "./components/UI/Title";

function App() {
  return (
    <div className="App">
      <Header>
        <Title>Header</Title>

        {fileTypeIcone("DOC")}
        {folderIcon(true)}
        {folderIcon(false)}
        {decorIcon("download")}
      </Header>
    </div>
  );
}

export default App;
