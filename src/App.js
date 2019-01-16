import React, {Component, Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {validate} from "./components/ValidateToken";
import {cookieRemove} from "./components/CookieUtil";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            isLoading: false,
            name: ""
        };
    }

    async componentDidMount() {
        this.setState({isAuthenticating: false});
        this.setName("");
        try {
            await validate().then(value => {
                this.setName(value);
                console.log(this.state.name);
                this.setState({isAuthenticated: value !== ""});
            });
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }
        if (this.state.isAuthenticated === false) {
            this.props.history.push("/login");
        }
    }

    setName = newName => {
        this.setState({name: "@ "+newName})
    };

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated});
    };

    handleLogout = event => {
        this.userHasAuthenticated(false);
        cookieRemove("token");
        this.setName("");
        this.props.history.push("/login");
    };

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userNameChange: this.setName,
            userHasAuthenticated: this.userHasAuthenticated,
            isLoading: this.state.isLoading
        };

        return (
            !this.state.isAuthenticating &&
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Chrono Alpha {this.state.name}</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.state.isAuthenticated
                                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                : <Fragment>
                                    <LinkContainer to="/signup">
                                        <NavItem>Signup</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default withRouter(App);