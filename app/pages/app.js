import React, { Component, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";

function App(props) {

	
	return (
		<div id='main'>
			<Helmet
				meta={[
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				]}>				
				<title>Lesson 04</title>
			</Helmet>
			{props.children}
			
		</div>
	)
}

export default App;

