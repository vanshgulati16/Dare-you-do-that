"use client";
import { Button } from '@nextui-org/react';
import { title, subtitle } from "@/components/primitives";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Home() {
	const router = useRouter();

	const handleLocalButtonClick = () => {
		router.push('/local');
	};

	const handleOnlineButtonClick = () => {
		router.push('/online');
	};
	return (
		<>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-6 h-80">
				<div className="flex flex-col items-center justify-center max-w-lg text-center mb-4">
					<h1 className={title()}>Dare you do that ☠️&nbsp;</h1>
					<br />
				</div>
				<div className='flex flex-row items-center gap-4'>
					
					<Button color="warning" size="lg" onClick={handleLocalButtonClick}>
						Local
					</Button>		
					<Button color="warning" size="lg" onClick={handleOnlineButtonClick}>
						online
					</Button>	
					
				</div>
				<footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center', padding: '10px 0' }}>
					&copy; 2024 Developed by Vansh Gulati
				</footer>
			</section>
		</>
	);
}
