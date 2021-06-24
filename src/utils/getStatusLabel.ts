const validStatus: {[statusKey: string]: string} = {
	watchList: 'Watch list',
	watching: 'Watching',
	waiting: 'Waiting',
	completed: 'Completed',
	stopped: 'Stopped',
	paused: 'Paused'
}

function getStatusLabel(statusKey: string) {
	return validStatus[statusKey]
}

export default getStatusLabel
