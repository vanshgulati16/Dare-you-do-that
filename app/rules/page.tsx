import { title, subtitle } from "@/components/primitives";
import {Card, CardBody} from "@nextui-org/react";

export default function AboutPage() {
	return (
		<>
			<div>
				<h1 className={title()}>Rules</h1>
			</div>
			<Card className="mt-6">
				<CardBody>
					<p className={subtitle()}>Rules are simple, there are {" "}<span style={{ color: "yellow", fontWeight: "bold" }}>2 skips*</span>{" "} and {" "}<span style={{ color: "yellow", fontWeight: "bold" }}>1 pass*</span>{" "} available for all the Players, rest be{" "}<span style={{ color: "purple", fontWeight: "bold" }}>naughty</span>{" "}😈 and enjoy!!!!</p>
					<br />
					<p className={subtitle()}>{" "}<span style={{ color: "yellow", fontWeight: "bold" }}>Skip: </span>{" "} Skip the question </p>
					<p className={subtitle()}>{" "}<span style={{ color: "yellow", fontWeight: "bold" }}>Pass: </span>{" "} Pass on the question to other person</p>
				</CardBody>
			</Card>
		</>
	);
}
