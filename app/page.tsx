"use client";
// import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { useState } from 'react';
import data from '../components/data.json';
// import {Input} from "@nextui-org/input";
import { Card, CardHeader, CardBody, Divider, Link, Image, Button, Input, Avatar } from '@nextui-org/react';
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export default function Home() {
	const [randomString, setRandomString] = useState<string>('');
	const [playerNames, setPlayerNames] = useState<string[]>(['Player 1']);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPlayerData, setShowPlayerData] = useState<boolean>(false);
	const [passes, setPasses] = useState<number[]>(Array(playerNames.length).fill(1));
    const [skips, setSkips] = useState<number[]>(Array(playerNames.length).fill(2));
	const [showWarning, setShowWarning] = useState<boolean>(false);


	const addPlayer = () => {
		const newPlayerName = `Player ${playerNames.length + 1}`;
		setPlayerNames([...playerNames, newPlayerName]);

		console.log(newPlayerName)

		// Initialize passes and skips for the new player
		setPasses([...passes, 1]);
		setSkips([...skips, 2]);

	};

	const removePlayer = (index: number) => {
		const updatedPlayers = [...playerNames];
		updatedPlayers.splice(index, 1);
		setPlayerNames(updatedPlayers);

		const updatedPasses = [...passes];
		updatedPasses.splice(index, 1);
		setPasses(updatedPasses);

		const updatedSkips = [...skips];
		updatedSkips.splice(index, 1);
		setSkips(updatedSkips);
	};

	const getRandomString = () => {
	  const randomIndex = Math.floor(Math.random() * data.length);
	  setRandomString(data[randomIndex]);
	};

	const playRound = () => {
		if (playerNames.length < 2) {
			// Display the warning alert
			setShowWarning(true);
			// Hide the alert after 3 seconds
			setTimeout(() => {
				setShowWarning(false);
			  }, 3000);
			return;
		}
		setIsLoading(true); // Set loading state to true
		getRandomString();
		setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length);
		setTimeout(() => {
			getRandomString();
			setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length);
			setShowPlayerData(true);
			setIsLoading(false); // Clear loading state
		}, 2000); // Adjust the timeout as needed

		// Decrease skips for the current player
		const updatedSkips = [...skips];
		// updatedSkips[currentPlayerIndex] = Math.max(0, skips[currentPlayerIndex] - 1);
		// setSkips(updatedSkips);
	};

	const nextRound = () => {
		// setIsLoading(false);
		// setShowPlayerData(false);
		getRandomString();
		setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length);
	};

	const pass = () => {
		if (passes[currentPlayerIndex] > 0) {
			setIsLoading(true);
			getRandomString();
			setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length);
			setShowPlayerData(true);
			setIsLoading(false);

			// Decrease passes for the current player
			const updatedPasses = [...passes];
			updatedPasses[currentPlayerIndex] = Math.max(0, passes[currentPlayerIndex] - 1);
			setPasses(updatedPasses);
		}
		};

		const skip = () => {
		if (skips[currentPlayerIndex] > 0) {
			getRandomString();
			setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerNames.length);

			// Decrease skips for the current player
			const updatedSkips = [...skips];
			updatedSkips[currentPlayerIndex] = Math.max(0, skips[currentPlayerIndex] - 1);
			setSkips(updatedSkips);
		}
	};
	
	  const exitGame = () => {
		setIsLoading(false);
		setShowPlayerData(false);
		setCurrentPlayerIndex(0);
		setPlayerNames(['Player 1']); // Reset player names
		setPasses(Array(playerNames.length).fill(1)); // Reset passes for all players
    	setSkips(Array(playerNames.length).fill(2)); // Reset skips for all players
	};
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-6">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Dare you do that ☠️&nbsp;</h1>
				<br />
			</div>
			{showPlayerData ? (
				<div className="mt-4 text-center">
				<h2 className="text-lg font-semibold mb-4">{playerNames[currentPlayerIndex]}</h2>
				{randomString && (
					<div 
					style={{
						maxWidth: "300px", // Set the maximum height as needed
						wordWrap: "break-word",
					  }}>
					<Card>
						<CardBody>
							<p>{randomString}</p>
						</CardBody>
					</Card>
					</div>
				)}
			  </div>			  
			) : (
			<Card className="w-[350px]">
				<CardHeader className="flex gap-3">
				<Avatar showFallback src='https://images.unsplash.com/broken' />
				<div className="flex flex-col">
					<p className="text-md">Add Players</p>
				</div>
				</CardHeader>
				<Divider />
				<CardBody>
				{playerNames.map((player, index) => (
					<div key={index} className="flex gap-3 items-center mt-2">
					<Input
						type="text"
						label={`Player ${index + 1}`}
						placeholder={`Player ${index + 1}`}
						// value={player}
						onChange={(e) => {
						const updatedPlayers = [...playerNames];
						updatedPlayers[index] = e.target.value;
						setPlayerNames(updatedPlayers);
						}}
					/>
					{index > 0 && (
						<DeleteIcon
						style={{
						  display: "flex",
						  justifyContent: "center",
						  alignItems: "center",
						  color: "red",
						  cursor: "pointer",
						  marginTop: "12px",
						}}
						onClick={() => removePlayer(index)}
					  />
					)}
					</div>
				))}
				{showWarning && (
				<Stack sx={{ width: '100%', marginTop: "10px" }} spacing={2}>
					<Alert severity="warning" onClose={() => setShowWarning(false)}>
					Single saala khelne aagaya 🤦
					</Alert>
				</Stack>
				)}
				<button
					className={"mt-4"}
					onClick={addPlayer}
				>
					+ Add Player
				</button>
				</CardBody>
				<Divider />
			</Card>
			)}

			<div className="mt-4">
				{showPlayerData ? (
					<div className="flex flex-col justify-around mt-4">
						<div className="mt-2">
							
							<Button color="danger" variant="bordered" onClick={exitGame} className="ml-2">
							Exit
							</Button>
							<Button color="success" onClick={nextRound} className="ml-2">
							Next
							</Button>
						</div>
						<div className="mt-2">
							<Button color="success" onClick={pass} className="ml-2" disabled={passes[currentPlayerIndex] === 0}>
								Pass ({passes[currentPlayerIndex]})
							</Button>
							<Button color="success" onClick={skip} className="ml-2" disabled={skips[currentPlayerIndex] === 0}>
								Skip ({skips[currentPlayerIndex]})
							</Button>
						</div>
				    </div>
					) : (
					<Button color="warning" isLoading={isLoading} onClick={playRound}>
						Play
					</Button>
				)}
			</div>
		</section>
		
	);
}
