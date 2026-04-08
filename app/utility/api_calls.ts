import CardProps from "@/app/interfaces/card"
import { API_URL } from "../settings";

const url = API_URL;

const paths = {
	cards: "cards"

}

export async function getcard<CardProps>(id: number) {
	const response = await fetch(url + "/" + paths.cards + "/" + id);
	const data = await response.json();
	return data;
}
