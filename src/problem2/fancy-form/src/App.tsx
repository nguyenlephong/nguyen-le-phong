import React from 'react';
import {appRouter} from "./routes/AppRoute";
import {RouterProvider} from "react-router-dom";

function App() {
  return (
    <div className="main-app">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
