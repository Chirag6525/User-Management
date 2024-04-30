"use client";
import { useEffect, useState } from "react";
import { List, ListItem, Card } from "@material-tailwind/react";

const AllUsers = () => {
	const [users, setUsers] = useState("");
	useEffect(() => {
		const fetchAllUsers = async () => {
			const response = await fetch("/api/users");
			const usersInfo = await response.json();
			setUsers(usersInfo.data);
		};
		fetchAllUsers();
	}, []);
	return (
		<div>
			{users &&
				users.map((users) => (
					<Card
						key={users.id}
						className="mb-4"
					>
						<List>
							<ListItem>{users.name}</ListItem>
						</List>
					</Card>
				))}
		</div>
	);
};
export default AllUsers;
