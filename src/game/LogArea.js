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
					switch (x.move) {
						case "text":
							return <div>{x.text}</div>
							break
						case "roll":
							return <div className="flex">{`${gameMetadata[x.playerID].name} rolled a `}<span className={`tokencolor-${x.catID} card`}>{x.roll}</span></div>
							break
						case "smallBet":
							return <div className="flex">{`${gameMetadata[x.playerID].name} took a small bet `}<span className={`tokencolor-${x.catID} card`}>{x.card}</span></div>
							break
						case "bigBet":
							return <div className="flex">{`${gameMetadata[x.playerID].name} made a ${x.side} bet`}</div>
							break
						case "placeMod":
							return <div className="flex">{`${gameMetadata[x.playerID].name} placed a ${x.type} mod at ${x.cellID}`}</div>
							break
						case "removeMod":
							return <div className="flex">{`${gameMetadata[x.playerID].name} removed the mod at ${x.cellID}`}</div>
							break
						case "flipMod":
							return <div className="flex">{`${gameMetadata[x.playerID].name} flipped the mod at ${x.cellID}`}</div>
							break
						case "moveMod":
							return <div className="flex">{`${gameMetadata[x.playerID].name} moved the mod to a ${x.type} mod at ${x.cellID}`}</div>
							break
					}
				})
			}
		</div>
	)
}

export default LogArea;