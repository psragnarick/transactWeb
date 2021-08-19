import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialButtonTransparentHamburger from "../components/MaterialButtonTransparentHamburger";
import MaterialButtonPrimary from "../components/MaterialButtonPrimary";
import MaterialCheckboxWithLabel from "../components/MaterialCheckboxWithLabel";
import MaterialSearchBar from "../components/MaterialSearchBar";
import MaterialCardWithoutImage from "../components/MaterialCardWithoutImage";

function Home(props) {
  return (
    <>
      <MaterialButtonTransparentHamburger
        style={{
          height: 61,
          width: 71,
          marginTop: 52,
          marginLeft: 286
        }}
      ></MaterialButtonTransparentHamburger>
      <MaterialButtonPrimary
        style={{
          height: 36,
          width: 198,
          marginTop: 22,
          marginLeft: 88
        }}
      ></MaterialButtonPrimary>
      <MaterialCheckboxWithLabel
        style={{
          height: 40,
          width: 201,
          marginTop: 17,
          alignSelf: "center"
        }}
      ></MaterialCheckboxWithLabel>
      <MaterialSearchBar
        style={{
          height: 56,
          width: 271,
          marginTop: 2,
          marginLeft: 50
        }}
      ></MaterialSearchBar>
      <MaterialCardWithoutImage
        style={{
          height: 410,
          width: 271,
          marginTop: 67,
          marginLeft: 50
        }}
      ></MaterialCardWithoutImage>
    </>
  );
}

export default Home;

'use strict';


const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/users'}).done(response => {
			this.setState({users: response.entity._embedded.users});
		});
	}

	render() {
		return (
			<userList users={this.state.users}/>
		)
	}
}
class userList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<user key={user._links.self.href} user={user}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{users}
				</tbody>
			</table>
		)
	}
}

class user extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.user.firstName}</td>
				<td>{this.props.user.lastName}</td>
				<td>{this.props.user.description}</td>
			</tr>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newuser = {};
		this.props.attributes.forEach(attribute => {
			newuser[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newuser);

		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createuser">Create</a>

				<div id="createuser" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new user</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

onCreate(newuser) {
	follow(client, root, ['users']).then(userCollection => {
		return client({
			method: 'POST',
			path: userCollection.entity._links.self.href,
			entity: newuser,
			headers: {'Content-Type': 'application/json'}
		})
	}).then(response => {
		return follow(client, root, [
			{rel: 'users', params: {'size': this.state.pageSize}}]);
	}).done(response => {
		if (typeof response.entity._links.last !== "undefined") {
			this.onNavigate(response.entity._links.last.href);
		} else {
			this.onNavigate(response.entity._links.self.href);
		}
	});
}

onNavigate(navUri) {
	client({method: 'GET', path: navUri}).done(userCollection => {
		this.setState({
			users: userCollection.entity._embedded.users,
			attributes: this.state.attributes,
			pageSize: this.state.pageSize,
			links: userCollection.entity._links
		});
	});
}

render() {
	const users = this.props.users.map(user =>
		<user key={user._links.self.href} user={user} onDelete={this.props.onDelete}/>
	);

	const navLinks = [];
	if ("first" in this.props.links) {
		navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
	}
	if ("prev" in this.props.links) {
		navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
	}
	if ("next" in this.props.links) {
		navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
	}
	if ("last" in this.props.links) {
		navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
	}

	return (
		<div>
			<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
						<th></th>
					</tr>
					{users}
				</tbody>
			</table>
			<div>
				{navLinks}
			</div>
		</div>
	)
}


function MaterialSearchBar(props) {
  return (
    <Container {...props}>
      <Rect1>
        <LeftIconButton>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="arrow-left"
              style={{
                backgroundColor: "transparent",
                color: "#000",
                fontSize: 24,
                opacity: 0.6
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </LeftIconButton>
        <InputStyleStack>
          <InputStyle placeholder="Search"></InputStyle>
          <RightIconButton>
            <ButtonOverlay>
              <MaterialCommunityIconsIcon
                name="close"
                style={{
                  backgroundColor: "transparent",
                  color: "#000",
                  fontSize: 24,
                  opacity: 0.6
                }}
              ></MaterialCommunityIconsIcon>
            </ButtonOverlay>
          </RightIconButton>
        </InputStyleStack>
      </Rect1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #3F51B5;
  padding: 4px;
  flex-direction: column;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const Rect1 = styled.div`
  flex-direction: row;
  background-color: #FFFFFF;
  align-items: center;
  border-radius: 2px;
  flex: 1 1 0%;
  margin-bottom: 4px;
  margin-top: 4px;
  margin-left: 4px;
  margin-right: 4px;
  display: flex;
`;

const LeftIconButton = styled.div`
  padding: 11px;
  flex-direction: column;
  display: flex;
  margin-left: 5px;
  margin-top: 5px;
  border: none;
`;

const InputStyle = styled.input`
  font-family: Roboto;
  height: 48px;
  color: #000;
  padding-right: 5px;
  font-size: 16px;
  align-self: flex-start;
  width: 257px;
  line-height: 16px;
  position: absolute;
  left: 0px;
  top: 0px;
  border: none;
  background: transparent;
`;

const RightIconButton = styled.div`
  padding: 11px;
  position: absolute;
  top: 1px;
  right: 0px;
  align-items: center;
  flex-direction: column;
  display: flex;
  border: none;
`;

const InputStyleStack = styled.div`
  width: 290px;
  height: 49px;
  margin-left: 21px;
  margin-top: 4px;
  position: relative;
`;

export default MaterialSearchBar;

import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialCardWithoutImage(props) {
  return (
    <Container {...props}>
      <BodyContent></BodyContent>
      <ActionBody>
        <ActionButton1>
          <ButtonOverlay>
            <Halt>Halt</Halt>
          </ButtonOverlay>
        </ActionButton1>
        <ActionButton2>
          <ButtonOverlay>
            <Cancel>Cancel</Cancel>
          </ButtonOverlay>
        </ActionButton2>
      </ActionBody>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const BodyContent = styled.div`
  padding: 16px;
  padding-top: 24px;
  justify-content: center;
`;

const ActionBody = styled.div`
  padding: 8px;
  flex-direction: row;
  left: 1px;
  width: 357px;
  top: 267px;
  height: 52px;
  display: flex;
`;

const ActionButton1 = styled.div`
  padding: 8px;
  height: 36px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const Halt = styled.span`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  opacity: 0.9;
`;

const ActionButton2 = styled.div`
  padding: 8px;
  height: 36px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const Cancel = styled.span`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  opacity: 0.9;
`;

export default MaterialCardWithoutImage;


function MaterialButtonTransparentHamburger(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name="menu"
        style={{
          color: "#3F51B5",
          fontSize: 24
        }}
      ></MaterialCommunityIconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
`;

export default MaterialButtonTransparentHamburger;

function MaterialButtonPrimary(props) {
  return (
    <Container {...props}>
      <Caption>BUTTON</Caption>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #2196F3;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Caption = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

export default MaterialButtonPrimary;

function MaterialCheckboxWithLabel(props) {
  return (
    <Container {...props}>
      <MaterialCommunityIconsIcon
        name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
        style={{
          color: "#3F51B5",
          fontSize: 28,
          lineHeight: "28px"
        }}
      ></MaterialCommunityIconsIcon>
      <CheckLabel>{props.label || "All previous transactions"}</CheckLabel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: transparent;
  flex-direction: row;
`;

const CheckLabel = styled.span`
  font-family: Arial;
  margin-left: 2px;
  font-size: 16px;
  color: rgba(0,0,0,0.87);
`;

export default MaterialCheckboxWithLabel;
