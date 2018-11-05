import PropTypes from 'prop-types';
import { 
	Label,
	Badge,
	Panel,
	PanelGroup,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap/lib';
import '../assets/css/general.scss';

const ResourceDetails = ({ activeBundle }) =>

	<div id='bundle'>

		<div id='bundleName'>
			{
				<h1 className='bundleName'>
					{
						activeBundle.name
					}
				</h1> 
			}
		</div>

		<div id='bundleDescription'>
			{
				<p className='bundleDescription'>
					{
						(activeBundle.description) ?
							activeBundle.description : 
							null
					}
				</p> 
			}
		</div>

		<div id='totalResources'>
			<p>
				Resources: <Badge>{ activeBundle.resources.length }</Badge>
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
	activeBundle: PropTypes.object.isRequired
};

export default ResourceDetails;