import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Tabs from "./components/tabs";
import Predict from "./features/predict";
import DataList from "./features/train-data/data-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto mt-4">
        <Tabs
          tabs={[
            { name: "predict", label: "Predict", content: <Predict /> },
            { name: "train", label: "Train Data", content: <DataList /> },
          ]}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
