/* @flow weak */
import React from 'react';
import TestAuthContainer from './test_auth_container.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Wrap with application context for a full render
// (eg., theming, authorization).
export default function withContext(child) {
  return (
    <MuiThemeProvider>
      <TestAuthContainer>
        {child}
      </TestAuthContainer>
    </MuiThemeProvider>
  );
}