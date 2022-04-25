import './App.css';
import Imgdisplay from './components/imgdisplay';

function App() {

  const toggle = () => {
    document.getElementById('plantviewcontainer').style.display = "initial";
    document.getElementById('backdrop').style.display = "initial";
  }

  return (
    <>
      <div id='backdrop' className='backdropfilter'></div>
      <div className="App">
        <div className='title'>
          <h1>Plant Guesser</h1>
          <button id='togglepopup' className='togglepopup' onClick={toggle}><img src={require('./assets/plant.png')}></img></button>
        </div>
        <Imgdisplay></Imgdisplay>
        <a href='https://github.com/ravager6969/plantguesser' className='github' target='_blank' rel='noreferrer'><i className='fa fa-github' style={{fontSize: "24px"}}></i></a>
        
      </div>
    </>
  );
}

export default App;