import React from 'react';
import './App.css';
import Menu from './Menu';
//
function App() {
  return (
    <div className="App">
      <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>
      <header className="App-header">
        <Menu />
      </header>
    </div>
  );
}

export default App;
