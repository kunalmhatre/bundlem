import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from './templates/PageTemplate';
import { Link } from 'react-router-dom';

const Create = ({ startBundleAction = f => f }) => {

	let bundleName, bundleDescription;

	const start = () => startBundleAction(
		bundleName.value, 
		bundleDescription.value
	);

	return (

		<PageTemplate>
			<center>
				<form>
					<table>
						<tbody>
							<tr>
								<td>
									<label 
										htmlFor='bundleName'>
										Bundle Name:
									</label>
								</td>
								<td>
									<input 
										ref={ input => bundleName = input }
										id='bundleName' 
										type='text'
									/>
								</td>
							</tr>
							<tr>
								<td 
									valign='top'>
									<label 
										htmlFor='bundleDescription'>
										Description:
									</label>
								</td>
								<td>
									<textarea
										ref={ input => bundleDescription = input } 
										id='bundleDescription' 
										type='text'
										style={{
											padding: "0.5em",
											width: '100%',
											'WebkitBoxSizing': 'border-box',
											'MozBoxSizing': 'border-box',
											'BoxSizing': 'border-box'
										}} 
									/>
								</td>
							</tr>
							<tr>
								<td></td>
								<td 
									align='right'>
									<Link to='/make'>
										<button 
											onClick={ start }>
											Start
										</button>
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</center>
		</PageTemplate>

	);

};

Create.propTypes = {

	startBundleAction: PropTypes.func
	
}

export default Create;