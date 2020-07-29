import React from 'react'

export default function LogArea({logArray, gameMetadata}) {

	const logArea = React.useRef(null)

	React.useEffect(() => {
		logArea.current.scrollTop = logArea.current.scrollHeight
	}, [logArray])



	return(
		<div className="log-area" ref={logArea}>
			{
				logArray.map((x, i) => {
					// console.log("xxx", JSON.stringify(x))
					switch (x.move) {
						case "text":
							return <div key={"log" + i}>{x.text}</div>
						case "roll":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} rolled a `}<span className={`tokencolor-${x.catID} card`}>{x.roll}</span></div>
						case "mod":
							return <div className="flex" key={"log" + i}>{`... found a ${x.mod}`}</div>
						case "smallBet": 
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} took a small bet `}<span className={`tokencolor-${x.catID} card`}>{x.card}</span></div>
						case "bigBet":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} made a ${x.side} bet`}</div>
						case "placeMod":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} placed a ${x.type} mod at ${x.cellID}`}</div>
						case "removeMod":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} removed the mod at ${x.cellID}`}</div>
						case "flipMod":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} flipped the mod at ${x.cellID}`}</div>
						case "moveMod":
							return <div className="flex" key={"log" + i}>{`${gameMetadata[x.playerID].name} moved the mod to a ${x.type} mod at ${x.cellID}`}</div>
						default:
							return <div key={"log" + i} />
					}
				})
			}
		</div>
	)
}
