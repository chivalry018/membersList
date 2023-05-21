import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
import App from './pages/app';
import Index from './pages/index'
import Member from './pages/members/index'
import Form from './pages/members/form'

export default (store) => {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="/main" component={Index} />
			<Route path="/members" component={Member} />	
			<Route path="/addmember" component={Form} />	
			<Route path="/editmember/:id" component={Form} />								
		</Route>
	);
};