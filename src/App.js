import { BackTop } from 'antd';
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

      <BackTop>
        <div 
          className='back-to-top'
        >UP</div>
      </BackTop>
    </div>
  );
}

export default App;
