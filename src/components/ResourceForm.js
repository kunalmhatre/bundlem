import React from 'react';
import PropTypes from 'prop-types';

const ResourceForm = ({ addResource = f => f, activeResource = {} }) => {

	let resourceTitle, resourceType, resourceURL, resourceDescription;

	const save = () => 

		addResource({
			title: resourceTitle.value,
			type: resourceType.value,
			url: resourceURL.value,
			description: resourceDescription.value
		});

	return (

		<div id='form'>
			<form>
				<table>
					<tbody>
						<tr>
							<td>
								<label 
									htmlFor='resourceTitle'>
									Title:
								</label>
							</td>
							<td>
								<input 
									ref={ input => resourceTitle = input }
									id='resourceTitle' 
									type='text'
									defaultValue={ ('title' in activeResource) ? activeResource.title : '' } />
							</td>
						</tr>
						<tr>
							<td>
								<label 
									htmlFor='resourceType'>
									Type:
								</label>
							</td>
							<td>
								<select 
									ref={ input => resourceType = input }
									id='resourceType'
									defaultValue={ ('type' in activeResource) ? activeResource.type : '' } >
									<option 
										value='Webpage'>
										Webpage</option>
									<option 
										value='Video'>
										Video</option>

									<option 
										value='Document'>
										Document</option>

									<option 
										value='Image'>
										Image</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>
								<label 
									htmlFor='resourceURL'>
									URL:
								</label>
							</td>
							<td>
								<input 
									ref={ input => resourceURL = input }
									id='resourceURL' 
									type='url'
									defaultValue={ ('url' in activeResource) ? activeResource.url : '' } />
							</td>
						</tr>
						<tr>
							<td>
								<label 
									htmlFor='resourceDescription'>
									Description:
								</label>
							</td>
							<td>
								<textarea
									ref={ input => resourceDescription = input } 
									id='resourceDescription' 
									type='text'
									defaultValue={ ('description' in activeResource) ? activeResource.description : '' }
									style={{
										padding: "0.5em",
										width: '100%',
										WebkitBoxSizing: 'border-box',
										MozBoxSizing: 'border-box',
										BoxSizing: 'border-box'
									}} />
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<button
									onClick={ save }>
									Save
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>

	);

}

ResourceForm.propTypes = {

	addResource: PropTypes.func,
	activeResource: PropTypes.object

}

export default ResourceForm;