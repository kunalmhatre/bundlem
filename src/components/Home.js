import React from 'react';
import { Link } from 'react-router-dom';
import Create from './Create';
import Search from './Search';

const Home = () => 

	<div 
		id='home'>
		<center>
			<h1>Bundlem</h1>
			<h3>Create your bundle of online resources</h3>
			<p>
				Bundlem helps you to create mini-courses by bundling online resources
			</p>
			<table>
				<tbody>
					<tr>
						<td>
							<Link 
								to='/create'>
								<button>
									Create Bundle
								</button>
							</Link>
						</td>
						<td>
							<Link 
								to='/search'>
								<button>
									Search Bundle
								</button>
							</Link>
						</td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>

export default Home;