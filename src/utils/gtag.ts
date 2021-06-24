export const analyticsId = String(process.env.NEXT_PUBLIC_GA_TRACKING_ID)

export const pageview = (url: URL) => {
	window.gtag('config', analyticsId, {page_path: url})
}

type GTagEvent = {
	action: string
	category: string
	label: string
	value: number
}

export const event = ({action, category, label, value}: GTagEvent) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value
	})
}
