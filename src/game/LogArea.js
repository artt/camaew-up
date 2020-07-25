import React from 'react'

function LogArea({logArray, gameMetadata}) {

	const logArea = React.useRef(null)

	React.useEffect(() => {
		logArea.current.scrollTop = logArea.current.scrollHeight
	}, [logArray])

	return(
		<div className="log-area" ref={logArea}>
			{
				logArray.map(x => {
					switch (x.type) {
						case "text":
							return <div>{x.text}</div>
							break
						case "roll":
							let playerName = "[Game]"
							if (x.playerID !== undefined)
								playerName = gameMetadata[x.playerID].name
							return <div className="flex">{`${playerName} rolls a `}<span className={`tokencolor-${x.catID} card`}>{x.roll}</span></div>
							break
					}
				})
			}
		</div>
	)
}

export default LogArea;