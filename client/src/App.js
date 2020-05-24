import React from 'react';
// import FileUpload from './components/FileUpload';
// import './App.css';


// TODO: Rest API to event for the allocation
// TODO: add styling
function App() {
  return (
    <div>
      <h1>
        Let's fly!
      </h1>
      {/* add event to make upload file */}
      <button>Flights Upload</button>
      {/* add event to make upload file */}
      <hr></hr>
      <button>PNRs Upload</button>
      <hr></hr>
      {/* add event to make upload file */}
      <button>Activate flights allocation</button>
      {/* run forEach loop to get all png vs flights */}
      <table>
        <tr>
          <th>PNR</th>
          <th>Flights</th>
          <th>Connection</th>
        </tr>
        <tr>
          <td>PNR01</td>
          <td>F1</td>
          <td>Direct flight</td>
        </tr>
        <tr>
          <td>PNR01</td>
          <td>F1, F2</td>
          <td>Connection Flight</td>
        </tr>
      </table>

    </div>
  );
}

export default App;
