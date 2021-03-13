import SEOHead from '../../components/SEOHead'
import GroupForm from '../../components/forms/Group'

const CreateGroup: React.FC = () =>
{
	return (
		<div className='page' >
			<SEOHead
				title='Create group | Cinephix'
			/>

			<GroupForm
				method='post'
			/>
		</div>
	)
}

export default CreateGroup