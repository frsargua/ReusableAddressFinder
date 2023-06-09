import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
// import { AddressFinder } from "./Components/LocationFInder/AddressFinder";
import { Spots } from "./Components/SpotsLocator/Spots";

function App() {
  return (
    <>
      {/* <AddressFinder /> */}
      <Spots />
    </>
  );
}

export default App;
