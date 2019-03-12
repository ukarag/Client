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
  width: 60%;
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
      newUsername: null,
      usernameEdit: null,
      status: null,
      creationDate: null,
      birthday: null,
      mine: false
    };
  }

  return() {
    this.props.history.push("/profile");
  }

  handleInputChange(value) {
    this.setState({ newUsername: value });
  }

  handleChange(key) {
    return e => {
      this.setState({[key]: e.target.value});
    };
  }

  change() {
    // TODO: check changed username and put on server
    this.props.history.push(`/profile/${this.props.match.params.id}`);
  }

  componentDidMount() {
    fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then( user => {
        this.setState({mine: user.token === localStorage.getItem("token")});
        if (this.state.mine){
          this.setState({name: user.name});
          this.setState({username: user.username});
          this.setState({password: user.password});
          this.setState({birthday: user.birthday});
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    if (this.state.mine) {
      let usernameRender;
      if (this.state.usernameEdit) {
        usernameRender = <div>
          <td>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange(e.target.value);
              }}
            />
            <Button
              width="50px"
              onClick={() => {
                this.setState({usernameEdit: false});
              }}
            >
              Back
            </Button>
          </td>
        </div>
      } else {
        usernameRender = <div>
          <td>
            {this.state.username}
            <Button
              width="50px"
              onClick={() => {
                this.setState({usernameEdit: true});
              }}
            >
              New
            </Button>
          </td>
        </div>
      }
      //Birthday
      return <Container>
        <h2>Profile of {this.state.username} </h2>
        <table
          width="300px"
        >
          <tbody>
          <tr>
            <td>username:</td>
            {usernameRender}
          </tr>
          <tr>
            <td>birthday:</td>

          </tr>
          </tbody>
          <tfoot>
          <tr>
          </tr>
          </tfoot>
        </table>
        <ButtonContainer>
          <Button
            width="40%"
            onClick={() => {
              this.change();
            }}
          >
            Change
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            width="40%"
            onClick={() => {
              this.props.history.push(`/profile/${this.props.match.params.id}`);
            }}
          >
            Go back
          </Button>
        </ButtonContainer>
      </Container>;
    } else {
      return <Container>
        <h2>This is not your Profile!</h2>
        <h3>You can only edit your own profile!</h3>
        <ButtonContainer>
          <Button
            width="40%"
            onClick={() => {
              this.props.history.push(`/profile/${this.props.match.params.id}`);
            }}
          >
            Go back
          </Button>
        </ButtonContainer>
      </Container>
    }
  }
}

export default withRouter(Settings);