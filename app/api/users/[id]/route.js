import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs"
//2.Get Specific User
export async function GET(_, res) {
	const { id } = await res.params;
	const user = users.filter((u) => u.id === id);
	return NextResponse.json({ user, ok: true });
}

//3.Login
export async function POST(req, res) {
	let { name, email, password } = await req.json();
	const { id } = await res.params;
	const {
		name: uName,
		email: uEmail,
		password: uPassword,
	} = users.find((u) => u.id === id);

	if (uName === name && uEmail === email && uPassword === password) {
		return NextResponse.json({ result: "Successfully Logged in" });
	} else if (!name || !email || !password) {
		return NextResponse.json({ result: "Please fill out the input fields" });
	} else {
		return NextResponse.json({ result: "Invalid Credentials" });
	}
}

//6.Delete User
export async function DELETE(req, res) {
	const { id } = await res.params;

	//find the index of the user to delete
	const userIndex = users.findIndex((user) => user.id === id);
	if (userIndex === -1) {
		return NextResponse.json({ result: "User not found" }, { status: 404 });
	}
	//remove the user from the users array
	users.splice(userIndex, 1);

	//Extract just the user array from the updated data
	const updatedUsersArray = users;
	//Convert the updated users array to Json string
	const updatedData = JSON.stringify(updatedUsersArray, null, 2);

	//write the updated users array to a json string
	fs.writeFileSync(
		"./app/util/db.js",
		`export const users = ${updatedData}`,
		"utf-8"
	);
	return NextResponse.json({ success: "User Successfully Deleted." });
}
