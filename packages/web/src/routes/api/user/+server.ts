import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
  const data = await fetch(`${process.env.API_ENDPOINT}/user`);
  const users = await data.json();

  return json(users, { status: 200 });
}
