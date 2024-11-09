import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../src/assets/sass/main.scss";
import { Provider } from "react-redux";
import { store } from "./app/feature/store.tsx";
import "./components/CustomScrollBar.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
