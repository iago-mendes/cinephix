import {t} from '@lingui/macro'

export function getStatusInfo() {
	const statusInfo: {[statusKey: string]: string} = {
		watchList: t`This status is dedicated to TV shows you want to watch but haven't done it yet.`,
		watching: t`This status is dedicated to TV shows you are currently watching.`,
		waiting: t`This status is dedicated to TV shows you have already started watching but haven't finished. For example, if you are waiting for more seasons of a show, this is the right place to put it.`,
		completed: t`This status is dedicated to TV shows you have already finished watching and there are no more seasons in production (this applies to cancelled shows as well).`,
		stopped: t`This status is dedicated to TV shows you have already started watching but stopped before the end of it. This could be because you got bored, the series quality decreased, etc..`,
		paused: t`This status is dedicated to TV shows you have already started watching, stopped before its end, AND you plan on finishing it some day.`
	}

	return statusInfo
}
