import React, { useContext } from 'react';
import InnerContainer from './InnerContainer';
import ThemeContext from './contexts/themeContext'

class MainContainer extends React.Component {

    static contextType = ThemeContext; // it's like doing MainContainer.contextType = ThemeContext, but in a more OOP way

    render() {
        return (
            <div>
                {this.context.theme} is the current theme. I can see it from Main Container.
                <InnerContainer />
            </div>
        )
    }

}

// MainContainer.contextType = ThemeContext;

export default MainContainer;