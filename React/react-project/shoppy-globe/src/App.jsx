import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import { router } from "./routes/router";

function App() {
  return (
    <Suspense
      fallback={
        <h2 style={{ textAlign: "center" }}>
          Loading...
        </h2>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;