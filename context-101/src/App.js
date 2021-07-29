import React, { useState, useContext } from 'react';
import ThemeContext from './contexts/themeContext';
import MainContainer from './MainContainer'

function App() {

  const [theme, setTheme] = useState("Blue")
  console.log(ThemeContext) // we see objects like Consumer and Provider

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> {/*anything that we wrap inside of this, can subscribe anywhere down the tree. Otherwise, we get the default value of the context*/}
      <h1>App component</h1>
      <button onClick={(e) => setTheme(theme === "Blue" ? "Red" : "Blue")}>
        {theme === "Blue" ? "Switch to red" : "Switch to Blue"}
      </button>
      <MainContainer />
    </ThemeContext.Provider>
  );
}

export default App;
// Context is like redux
// With context, we don't need to pass props from one component down the next
// But unlike redux, Context is linear. The state has to be somewhere in the parent tree