"use server";
import { neon } from "@neondatabase/serverless";
import { Task } from "./types/Task";

export async function newUser(email: string) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	const existingUser = await sql.query(
		"SELECT * FROM users WHERE email = $1",
		[email]
	);

	if (existingUser.length === 0) {
		await sql.query(
			"INSERT INTO users (email) VALUES ($1)",
			[email]
		);

		const userIdResult = await sql.query(
			"SELECT id FROM users WHERE email = $1",
			[email]
		);

		const userId = userIdResult[0]?.id;
		if (!userId) throw new Error("Failed to retrieve user ID after insertion");

		const now = new Date();
		const formatDate = (daysToAdd: number) =>
			new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 10);

		const onboardingTasks = [
			{
				title: "Welcome to Task Manager!",
				description: "Let's get started! Take a quick look around the app and mark this task as completed when you're ready.",
				status: "Not started",
				priority: "Low",
				effort: "Low",
				duedate: formatDate(3),
				tasktype: "Onboarding"
			},
			{
				title: "Create your first task",
				description: "Create a task and give it a name that makes sense for you.",
				status: "Not started",
				priority: "Medium",
				effort: "Low",
				duedate: formatDate(5),
				tasktype: "Onboarding"
			},
			{
				title: "Add a due date to a task",
				description: "Deadlines help you stay on track. Pick any task and assign it a due date.",
				status: "Not started",
				priority: "Medium",
				effort: "Low",
				duedate: formatDate(7),
				tasktype: "Onboarding"
			}
		];

		for (const task of onboardingTasks) {
			await sql.query(
				`INSERT INTO tasks (userid, title, description, status, priority, effort, duedate, tasktype)
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[
					userId,
					task.title,
					task.description,
					task.status,
					task.priority,
					task.effort,
					task.duedate,
					task.tasktype
				]
			);
		}
	}
}

export async function getTasks(email: string) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	const tasks = await sql.query(
		"SELECT * FROM tasks WHERE userid = (SELECT id FROM users WHERE email = $1)",
		[email]
	);

	return tasks;
}

export async function createTask(email: string, task: Task) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	const user = await sql.query(
		"SELECT id FROM users WHERE email = $1",
		[email]
	);

	if (user.length === 0) {
		throw new Error("User not found");
	}

	await sql.query(
		"INSERT INTO tasks (title, description, status, priority, effort, duedate, tasktype, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		[task.title, !task.description ? 'No description' : task.description, task.status, task.priority, task.effort, !task.duedate ? '-' : task.duedate, !task.tasktype ? '-' : task.tasktype, user[0].id]
	);
}

export async function updateTask(email: string, task: Task) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	await sql.query(
		"UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, effort = $5, duedate = $6, tasktype = $7 WHERE id = $8 AND userid = (SELECT id FROM users WHERE email = $9)",
		[task.title, !task.description ? 'No description' : task.description, task.status, task.priority, task.effort, !task.duedate ? '-' : task.duedate, !task.tasktype ? '-' : task.tasktype, task.id, email]
	);
}

export async function deleteTask(email: string, taskId: number) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	await sql.query(
		"DELETE FROM tasks WHERE id = $1 AND userid = (SELECT id FROM users WHERE email = $2)",
		[taskId, email]
	);
}
export async function deleteAllCompletedTasks(email: string) {
	const sql = neon(process.env.DATABASE_URL ?? (() => { throw new Error("DATABASE_URL is not defined"); })());

	await sql.query(
		"DELETE FROM tasks WHERE status = 'Completed' AND userid = (SELECT id FROM users WHERE email = $1)",
		[email]
	);
}