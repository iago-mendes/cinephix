import TvshowForm from '../../../../components/_forms/Tvshow'
import SEOHead from '../../../../components/SEOHead'
import {t} from '@lingui/macro'

const AddTvshow: React.FC = () => {
	return (
		<div className="page">
			<SEOHead title={t`Add TV show` + ' | Cinephix'} />

			<TvshowForm method="post" />
		</div>
	)
}

export default AddTvshow
