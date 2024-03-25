import { Fragment } from "react/jsx-runtime";
import { Toaster } from "react-hot-toast";
import Todos from "./pages/Todos";

function App() {
  return (
    <Fragment>
      <Todos />
      <Toaster position="bottom-center" />
    </Fragment>
  );
}

export default App;
