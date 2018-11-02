import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
	Col, 
	Button,
	ButtonToolbar,
	Well,
	Label,
	Badge,
	Grid,
	Row,
	Panel,
	PanelGroup,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap/lib';

const ResourceDetails = ({ activeBundle = {} }) =>

	<div id='bundle'>
		<div id='bundleDescription'>
			<Well>
			{
				activeBundle.description
			}
			</Well>
		</div>
		<div id='totalResources'>
			<p>
				Total Resources: <Badge>{ activeBundle.resources.length }</Badge>
			</p>
		</div>
		<hr/>
		<div id='bundleResources'>
			<PanelGroup accordion id='resources'>
			{
				activeBundle.resources.map((resource, index) => 
					
					<Panel key={ index } bsStyle='primary' eventKey={ index }>
						<Panel.Heading>
							<Panel.Title toggle>
								<div id='panelTitle'>
								{ 
									(resource.title) ? `${ index + 1 }. ${ resource.title }` : `Resource ${ index + 1 }` 
								}
								</div>
							</Panel.Title>
						</Panel.Heading>
						<Panel.Body collapsible>
							<ListGroup>
								<ListGroupItem className='textColorGrey'>
									<Label bsStyle='info'>{ resource.type }</Label>
								</ListGroupItem>
								<ListGroupItem>
									<a href={ `${ resource.url }` }>{ resource.url }</a>
								</ListGroupItem>
								{
									(resource.notes) ?
										<ListGroupItem>
											{ resource.notes }
										</ListGroupItem> :
										null		
								}
							</ListGroup>
						</Panel.Body>
					</Panel>

				)
			}
			</PanelGroup>
		</div>
		<Link to='/make'>
			<Button 
				bsStyle='primary'
				bsSize='large'>
				Back
			</Button>
		</Link>
	</div>

ResourceDetails.propTypes = {

	activeBundle: PropTypes.object,

}

export default ResourceDetails;