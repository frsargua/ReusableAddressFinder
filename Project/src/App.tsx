import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import { AddressFinder } from "./Components/LocationFInder/AddressFinder";
// import { Finder } from "./Components/LocationFInder/Index";

function App() {
  return (
    <>
      {/* <Finder /> */}
      <AddressFinder />
    </>
  );
}

export default App;
