import PropTypes from 'prop-types';
import { 
	Well,
	Label,
	Badge,
	Panel,
	PanelGroup,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap/lib';

const ResourceDetails = ({ activeBundle = {} }) =>

	<div id='bundle'>
		<div id='bundleDescription'>
			{
				(activeBundle.description) ?
					<Well>
					{
						activeBundle.description
					}
					</Well> :
					null
			}
		</div>
		<div id='totalResources'>
			<p>
				Total Resources: <Badge>{ activeBundle.resources.length }</Badge>
			</p>
		</div>
		<hr />
		<div id='bundleResources'>
			<PanelGroup accordion id='resources'>
			{
				activeBundle.resources.map((resource, index) => 
					
					<Panel key={ index } bsStyle='primary' eventKey={ index }>
						<Panel.Heading>
							<Panel.Title toggle>
								<div id='panelTitle'>
								{ 
									(resource.title) ? 
										`${ index + 1 }. ${ resource.title }` : 
										`${ index + 1 }. ${ resource.type }`
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
	</div>;

ResourceDetails.propTypes = {

	activeBundle: PropTypes.object,

};

export default ResourceDetails;