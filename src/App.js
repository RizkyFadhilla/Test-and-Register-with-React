import { Provider } from "react-redux";
import { store } from "./stores";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </div>
  );
}

export default App;
