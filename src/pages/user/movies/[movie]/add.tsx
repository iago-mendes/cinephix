import MovieForm from '../../../../components/forms/Movie'
import SEOHead from '../../../../components/SEOHead'
import {t} from '@lingui/macro'

const AddMovie: React.FC = () => {
	return (
		<div className="page">
			<SEOHead title={t`Add movie` + ' | Cinephix'} />

			<MovieForm method="post" />
		</div>
	)
}

export default AddMovie
