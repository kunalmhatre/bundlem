import React from 'react';
import PropTypes from 'prop-types';

const ResourceDetails = ({ editActiveResource = f => f, removeActiveResource = f => f, activeResource = {} }) => {

	return (

		<div id='details'>
			<table>
				<tbody>
					<tr>
						<td>
							Title:
						</td>
						<td>
							<b>{ activeResource.title }</b>
						</td>
					</tr>
					<tr>
						<td>
							Type:
						</td>
						<td>
							<b>{ activeResource.type }</b>
						</td>
					</tr>
					<tr>
						<td>
							URL:
						</td>
						<td>
							<a href={ `'${activeResource.url}'` }>{ activeResource.url }</a>
						</td>
					</tr>
					<tr>
						<td>
							Description:
						</td>
						<td>
							<b>{ activeResource.description }</b>
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<button onClick={ () => editActiveResource() }>
								Edit
							</button>
							<button onClick={ () => removeActiveResource() } >
								Remove
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	);

}

ResourceDetails.propTypes = {

	activeResource: PropTypes.object,
	editActiveResource: PropTypes.func,
	removeActiveResource: PropTypes.func

}

export default ResourceDetails;