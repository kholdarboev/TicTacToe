import Square from './components/Square/Square';

function App() {
  return (
    <div className="App">
       <Square value='X' onClick={()=> alert('X')}/>
    </div>
  );
}

export default App;
