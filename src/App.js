import './App.css';
import Imgdisplay from './components/imgdisplay';

function App() {

  return (
    <div className="App">
      <div className='title'>
        <h1>Plant Guesser</h1>
      </div>
      <Imgdisplay></Imgdisplay>
      <a href='https://github.com/ravager6969/plantguesser' className='github' target='_blank' rel='noreferrer'><i className='fa fa-github' style={{fontSize: "24px"}}></i></a>
    </div>
  );
}

export default App;