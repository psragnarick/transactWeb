'use strict';

// tag::vars[]
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
