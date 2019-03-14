import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
//import { Spinner } from "../../views/design/Spinner";

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      birthday: null,
      creationDate: null,
      status: null,
      mine:false

    };
  }

  getBack()  {
    this.props.history.push("/game");
  }

  settings(){
    this.props.history.push(`/profile/settings`);
  }

  componentDidMount() {

    fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())

      .then(user => {
        this.setState({name: user.name})
        this.setState({username: user.username });
        this.setState({birthday: user.birthday});
        this.setState({creationDate: user.creationDate});
        this.setState({status: user.status});
        this.setState({mine: user.token === localStorage.getItem("token")});
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      //<BaseContainer>
      <Container>
        <table width="400px">
          <tr>
            <th >name:</th>
            <th>{this.state.name}</th>
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
            disabled={!this.state.mine}
            width="30%"
            onClick={() => {
              this.settings();
            }}
          >
            Settings
          </Button>
        </ButtonContainer>

        <ButtonContainer>
          <Button
            width="30%"
            onClick={() => {
              this.getBack();
            }}
          >
            Go Back
          </Button>
        </ButtonContainer>
      </Container>
      //</BaseContainer>
    );
  }
}
export default withRouter(UserProfile);