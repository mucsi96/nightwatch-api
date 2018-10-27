import React from "react";
import { withDehydration } from "./DehydrationProvider";

const RehydrationInitialState = ({ getInitialState }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `window.__REHYDRATION_INITIAL_STATE__ = JSON.parse('${JSON.stringify(
        getInitialState()
      )}')`
    }}
  />
);

export default withDehydration(RehydrationInitialState);
