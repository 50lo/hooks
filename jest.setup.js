jest.mock("react-native", () => {

	return {
		Platform: {
			select: jest.fn((platform) => platform.default),
		},
		Dimensions: {
			get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
			addEventListener: jest.fn(),
		},
		useWindowDimensions: jest.fn().mockReturnValue({ width: 375, height: 812 }),
		AppState: {
			currentState: "active",
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
		},
		BackHandler: {
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
		},
                Keyboard: (() => {
                        const listeners = new Map()
                        let visible = false
                        let metrics
                        return {
                                addListener: jest.fn((event, cb) => {
                                        listeners.set(event, cb)
                                        return {
                                                remove: jest.fn(() => listeners.delete(event)),
                                        }
                                }),
                                emit: jest.fn((event, data) => {
                                        const cb = listeners.get(event)
                                        if (cb) cb(data)
                                        if (event === "keyboardDidShow") {
                                                visible = true
                                                metrics = data?.endCoordinates
                                        }
                                        if (event === "keyboardDidHide") {
                                                visible = false
                                                metrics = undefined
                                        }
                                }),
                                isVisible: jest.fn(() => visible),
                                metrics: jest.fn(() => metrics),
                        }
                })(),
		AccessibilityInfo: {
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
			removeEventListener: jest.fn(),
			setAccessibilityFocus: jest.fn(),
			announceForAccessibility: jest.fn(),
			isBoldTextEnabled: jest.fn().mockResolvedValue(false),
			isScreenReaderEnabled: jest.fn().mockResolvedValue(false),
			isGrayscaleEnabled: jest.fn().mockResolvedValue(false),
			isInvertColorsEnabled: jest.fn().mockResolvedValue(false),
			isReduceMotionEnabled: jest.fn().mockResolvedValue(false),
			isReduceTransparencyEnabled: jest.fn().mockResolvedValue(false),
		},
		InteractionManager: {
			runAfterInteractions: jest.fn(() => ({
				cancel: jest.fn(),
			})),
		},
		Image: {
			getSize: jest.fn(),
			getSizeWithHeaders: jest.fn(),
			resolveAssetSource: jest.fn().mockReturnValue({ width: 100, height: 100 }),
		},
	}
})

global.window = {}
global.window.addEventListener = () => {}
