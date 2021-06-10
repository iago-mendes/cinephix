import MovieForm from '../../../../components/forms/Movie'
import SEOHead from '../../../../components/SEOHead'

const AddMovie: React.FC = () =>
{
	return (
		<div className='page' >
			<SEOHead
				title='Add movie | Cinephix'
			/>

			<MovieForm
				method='post'
			/>
		</div>
	)
}

export default AddMovie