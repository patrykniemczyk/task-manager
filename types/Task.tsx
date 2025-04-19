export type Task = {
	id: number
	title: string
	description: string
	status: "Not started" | "In progress" | "In review" | "Completed"
	priority: "High" | "Medium" | "Low"
	effort: "High" | "Medium" | "Low"
	duedate: string
	tasktype: string
}
