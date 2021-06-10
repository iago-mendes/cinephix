import TvshowForm from '../../../../components/forms/Tvshow'
import SEOHead from '../../../../components/SEOHead'

const AddTvshow: React.FC = () =>
{
	return (
		<div className='page' >
			<SEOHead
				title='Add TV show | Cinephix'
			/>

			<TvshowForm
				method='post'
			/>
		</div>
	)
}

export default AddTvshow