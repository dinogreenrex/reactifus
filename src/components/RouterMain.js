import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import App from '../App'





class RouterMain extends React.Component {
    constructor(props){
        super(props);
        console.log("Router" + this.props);
    }

    render() {
        let isAuth=this.props.isUserLoggedIn;
        return (
                <Router>
                <div>
                        <Route
                            path="/"
                            component={App} />

                </div>
                </Router>
        )
    }
}
export default connect(
    (state) => {
        return {
            isUserLoggedIn: state.freducer.isUserLoggedIn
        }
    }
)(RouterMain);