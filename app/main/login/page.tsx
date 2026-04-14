import { CardGet, CardCreate } from "@/app/interfaces/card";
import { API_URL } from "@/app/settings";

// ----------------------
// 🔧 CONFIG (ONLY CHANGE THIS PER ENTITY)
// ----------------------

const RESOURCE = "cards";

type Entity = CardGet;
type Create = CardCreate;
type Update = CardCreate;

// ----------------------
// Helpers
// ----------------------

const getToken = (): string | undefined => {
	if (typeof window === "undefined") return undefined;
	return localStorage.getItem("token") || undefined;
};

const getAuthHeaders = (token?: string): HeadersInit => ({
	"Content-Type": "application/json",
	...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Request failed");
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json();
}

async function request<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	const token = getToken();

	const response = await fetch(`${API_URL}/${path}`, {
		...options,
		headers: {
			...getAuthHeaders(token),
			...(options.headers || {}),
		},
	});

	return handleResponse<T>(response);
}

// ----------------------
// API calls
// ----------------------

// GET all
export async function getAll(token?: string): Promise<Entity[]> {
	return request<Entity[]>(RESOURCE);
}

// GET one
export async function getOne(
	id: number,
	token?: string
): Promise<Entity> {
	return request<Entity>(`${RESOURCE}/${id}`);
}

// CREATE
export async function create(
	body: Create,
	token?: string
): Promise<Entity> {
	return request<Entity>(RESOURCE, {
		method: "POST",
		body: JSON.stringify(body),
	});
}

// UPDATE
export async function update(
	id: number,
	body: Update,
	token?: string
): Promise<Entity> {
	return request<Entity>(`${RESOURCE}/${id}`, {
		method: "PUT", // or PATCH
		body: JSON.stringify(body),
	});
}

// DELETE
export async function remove(
	id: number,
	token?: string
): Promise<void> {
	return request<void>(`${RESOURCE}/${id}`, {
		method: "DELETE",
	});
}
