import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function infoAlert(title: string, message: string)
{
	MySwal.fire({
		icon: 'info',
		title,
		text: message,
		showConfirmButton: false,
		showCancelButton: true,
		cancelButtonText: 'Close'
	})
}

export default infoAlert