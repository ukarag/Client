import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import User from "../shared/models/User";


const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  width: ${props => props.width || null};
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

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200%;
  height: 500px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      birthday: null,
      newUsername: null,
      newBirthday: null,
      userList: null
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  /*handleChange(key) {
    return e => {
      this.setState({[key]: e.target.value});
    };
  }*/

  saveUsername() {
      fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
        })
      })
        .then(response => response.json())
        .then( res=>{
          if (res.error) {
            alert(res.message);
            this.setState({username: null});
          } else{
            this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`);
          }
        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
  }

  saveBirthday() {
      fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          birthday: this.state.birthday
        })
      })
        .then(response => response.json())
        .then( res=>{
          if (res.error) {
            alert(res.message);
            this.setState({birthday: null});
          } else{
            this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`);
          }
        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
    }

  return(){ //go back to the site of game when we dont want to change
    this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`);
  }

  componentDidMount() {
    //Fragen wieso
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(users => {
        this.setState({ userList: users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
        <Container>
            <table width="350px">
              <tr>
                <td >username:</td>
              </tr>
                <InputField
                  width="100%"
                  placeholder="new username"
                  onChange={e => {
                    this.handleInputChange("username", e.target.value);
                  }}
                />

                <ButtonContainer>
                  <Button
                    disabled={!this.state.username}
                    width="40%"
                    onClick={() => {
                      this.saveUsername();
                    }}
                  >
                    Save Username
                  </Button>
                </ButtonContainer>

              <tr>
                <td>birthday:</td>
              </tr>
                <InputField
                  width="100%"
                  placeholder="dd.MM.yyyy"
                  onChange={e => {
                    this.handleInputChange("birthday", e.target.value);
                  }}
                />
                <ButtonContainer>
                  <Button
                    disabled={!this.state.birthday}
                    width="40%"
                    onClick={() => {
                      this.saveBirthday();
                    }}
                  >
                    Save Birthday
                  </Button>
                </ButtonContainer>

            </table>
            <ButtonContainer>
              <Button
                width="75%"
                onClick={() => {
                  this.return();
                }}
              >
                Back
              </Button>
            </ButtonContainer>
          </Container>
    );
  }
}

export default withRouter(Settings);