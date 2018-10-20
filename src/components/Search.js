import React from 'react';
import PageTemplate from './templates/PageTemplate';

const Search = () => {

	let bundleId, bundle;

	const search = () => {

		fetch(`URL${bundleId.value}`)
			.then(response => {
				if (response.status == 200) {
					return response.json();
				} else if (response.status == 404) {
					throw new Error('Bundle not found');
				} else {
					throw new Error('Server error');
				}
			})
			.then(data => bundle = data)
			.catch(error => alert(error));

	}

	return (

		<PageTemplate>
			<center>
				<h1>Enter the Bundle ID</h1>
				<form>
					<table>
						<tbody>
							<tr>
								<td>
									<input 
										ref={ input => bundleId = input }
										type='text' />
								</td>
							</tr>
							<tr>
								<td>
									<button onClick={ search }>
										Search
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</center>
		</PageTemplate>

	);
}

export default Search;