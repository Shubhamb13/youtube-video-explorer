import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import store from "./util/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Watchpage from "./components/Watchpage";
import SearchPage from "./components/SearchPage";
import Category from "./components/Category";
import Livepage from "./components/Livepage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <MainContainer /> },
      { path: "watch", element: <Watchpage /> },
      { path: "search", element: <SearchPage /> },
      { path: "/category/:name", element: <Category /> },
      { path: "/live", element: <Livepage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
