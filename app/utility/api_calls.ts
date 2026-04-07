import CardProps from "@/app/interfaces/card"

const url = "http://localhost:8000"

const paths = {
	cards: "cards"

}

export async function getcard<CardProps>(id: number) {
	const response = await fetch(url + "/" + paths.cards + "/" + id);
	const data = await response.json();
	return data;
}
