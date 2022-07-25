// COMPONENTS
import fileTypeIcone from './components/UI/icons/Files';
import folderIcon from './components/UI/icons/Folder';
import decorIcon from './components/UI/icons/Decore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        header
        {
          fileTypeIcone('doc')
        }
        {
          folderIcon(true)
        }
        {
          folderIcon(false)
        }
        {
          decorIcon('download')
        }
      </header>
    </div>
  );
}

export default App;
