import React, { useContext } from 'react';
import ThemeContext from './contexts/themeContext'

function ThemedButton(props) {
    // modern way:
    // const theme = useContext(ThemeContext);
    // return <h1>{theme}</h1>

    return (
        // this is how it was before hooks
        <ThemeContext.Consumer>
            {(themeContext) => <h1>{themeContext.theme}</h1>}
        </ThemeContext.Consumer>
    )

}

export default ThemedButton;