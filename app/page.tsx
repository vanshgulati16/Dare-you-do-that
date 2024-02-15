"use client";
// import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { useState, useEffect } from 'react';
import data from '../components/data.json';
import { getRandomQuestion } from '../components/questions';
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
	const [showAlert, setShowAlert] = useState(false);



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

	// const getRandomString = () => {
	//   const randomIndex = Math.floor(Math.random() * data.length);
	//   setRandomString(data[randomIndex]);
	// };

	const getRandomString = () => {
        // const question = getRandomQuestion();
        // setRandomString(question || '');
		const question = getRandomQuestion();
        if (!question) {
            setShowAlert(true); 
			setTimeout(() => {
				exitGame();
				setShowAlert(false);
			}, 3000);
			return;
        } else {
            setRandomString(question || '');
        }
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
			{showAlert && (
				<div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"style={{zIndex: "99"}}>
				<div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
					<div className="rounded-lg shadow-xs overflow-hidden">
					<div className="p-4">
						<div className="flex items-start">
						<div className="flex-shrink-0">
							<svg
							className="h-6 w-6 text-green-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
							>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
							</svg>
						</div>
						<div className="ml-3 w-0 flex-1 pt-0.5">
							<p className="text-sm font-medium text-gray-900">
							Thank you for playing!
							</p>
						</div>
						<div className="ml-4 flex-shrink-0 flex">
							<button
							onClick={() => setShowAlert(false)}
							className="inline-flex text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
							<span className="sr-only">Close</span>
							<svg
								className="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
								fillRule="evenodd"
								d="M14.293 5.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414zM5.707 14.293a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 01-1.414 0z"
								clipRule="evenodd"
								/>
							</svg>
							</button>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			)}
		</section>
		
	);
}
