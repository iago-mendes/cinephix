import {t} from '@lingui/macro'

export function getStatusOptions() {
	const statusOptions: {[statusKey: string]: string} = {
		watchList: t`Watch list`,
		watching: t`Watching`,
		waiting: t`Waiting`,
		completed: t`Completed`,
		stopped: t`Stopped`,
		paused: t`Paused`
	}
	return statusOptions
}
