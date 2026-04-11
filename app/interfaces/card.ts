interface CardBase {
	name: string
	title: string
	user_id: number
	illustration: string
	cardtype: string
	type1: string
	type2: string
	skilltype1: string
	skilltext1: string
	skilltype2: string
	skilltext2: string
	cost: string
	power: string
	size: string
	linktop: string
	linkbottom: string
	linkleft: string
	linkright: string
	cardset: string
}

export type CardCreate = CardBase;

export type CardGet = CardBase & { id: number };
