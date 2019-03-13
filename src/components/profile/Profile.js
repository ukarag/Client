import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      status: null,
      creationDate: null,
      birthday: null,
      mine: false
    };
  }

  return() {
    this.props.history.push(`/game`);
  }

  settings() {
    this.props.history.push(`/profile/settings`);
  }

  componentDidMount() {
    fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
      .then(response => response.json())
      .then( user => {
        this.setState({name: user.name});
        this.setState({username: user.username});
        this.setState({status: user.status});
        this.setState({creationDate: user.creationDate});
        this.setState({birthday: user.birthday});
        this.setState({mine: user.token === localStorage.getItem("token")})
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    const style = {
      display: this.state.mine ? '' : 'none'
    };
    return (
      <Container>
        <h2>Profile of {this.state.username} </h2>
        <table width="400px">
          <tr>
            <th >user:</th>
            <th>{this.state.user}</th>
          </tr>
          <tr>
            <th >username:</th>
            <th>{this.state.username}</th>
          </tr>
          <tr>
            <th>status:</th>
            <th>{this.state.status}</th>
          </tr>
          <tr>
            <th>creation date:</th>
            <th>{this.state.creationDate}</th>
          </tr>
          <tr>
            <th>birthday:</th>
            <th>{this.state.birthday}</th>
          </tr>
        </table>
        <ButtonContainer>
          <Button
            width="40%"
            onClick={() => {
              this.return();
            }}
          >
            Return
          </Button>
        </ButtonContainer>

        <ButtonContainer>

          <Button
            width="40%"
            onClick={() => {
              this.settings();
            }}
          >
            Settings
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

export default withRouter(Profile);