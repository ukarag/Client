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
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
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
            width="20%"
            onClick={() => {
              this.settings();
            }}
          >
            Settings
          </Button>
        </ButtonContainer>

        <ButtonContainer>
          <Button
            width="20%"
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