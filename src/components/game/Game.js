import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    //localStorage.removeItem("token");
    //this.props.history.push("/login");
    console.log(localStorage);
    // if (localStorage.getItem("user_id") != null) {
    fetch(`${getDomain()}/logout/${localStorage.getItem("user_id")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.message);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id")
          console.log("logging out")
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  } //else {
    //this.props.history.push("/login");



  profile(){
    this.props.history.push("/profile/MyProfile")
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Welcome! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return(
                  <PlayerContainer
                    key={user.id}
                    onClick = {() => {
                      this.props.history.push(`/profile/${user.id}/show`);
                    }}
                  >
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>

            <ButtonContainer>
              <Button
                width="100%"
                onClick={() => {
                  this.logout();
                }}
              >
                Logout
              </Button>
            </ButtonContainer>

          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);