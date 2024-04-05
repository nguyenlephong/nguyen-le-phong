import React from 'react';
import {appRouter} from "./routes/AppRoute";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {ConfigProvider} from "antd";
import {AntdThemeConf} from "./configs/antdTheme.conf";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <div className="main-app">
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={AntdThemeConf}>
          <RouterProvider router={appRouter} />
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
