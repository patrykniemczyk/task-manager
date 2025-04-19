'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useNavigateWithData from '@/hooks/useNavigateWithData';
import { Task } from "@/types/Task";
import { TaskRow } from "@/components/TaskRow";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tasks: Task[] = [
	{
		id: 1,
		title: "Design login page",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		status: "In progress",
		priority: "High",
		effort: "High",
		dueDate: "2025-04-20",
		taskType: "Design",
	},
	{
		id: 2,
		title: "Implement authentication API",
		description: "Develop a secure API for user authentication.",
		status: "Not started",
		priority: "High",
		effort: "High",
		dueDate: "2025-04-22",
		taskType: "Development",
	},
	{
		id: 3,
		title: "Write unit tests for user module",
		description: "Write comprehensive unit tests for the user module.",
		status: "In progress",
		priority: "Medium",
		effort: "High",
		dueDate: "2025-04-21",
		taskType: "Testing",
	},
	{
		id: 4,
		title: "Create onboarding flow UI",
		description: "Design the user interface for the onboarding flow.",
		status: "Not started",
		priority: "Low",
		effort: "Medium",
		dueDate: "2025-04-28",
		taskType: "Design",
	},
	{
		id: 5,
		title: "Optimize database queries",
		description: "Improve the performance of database queries.",
		status: "In review",
		priority: "High",
		effort: "Medium",
		dueDate: "2025-04-15",
		taskType: "Development",
	},
	{
		id: 6,
		title: "Set up CI/CD pipeline",
		description: "Configure the continuous integration and continuous deployment pipeline.",
		status: "Not started",
		priority: "High",
		effort: "Low",
		dueDate: "2025-04-25",
		taskType: "DevOps",
	},
	{
		id: 7,
		title: "Fix login redirect bug",
		description: "Resolve the issue causing incorrect redirects after login.",
		status: "Completed",
		priority: "High",
		effort: "Low",
		dueDate: "2025-04-15",
		taskType: "Bugfix",
	},
	{
		id: 8,
		title: "Prepare demo presentation",
		description: "Create a presentation for the upcoming demo.",
		status: "In progress",
		priority: "Low",
		effort: "Medium",
		dueDate: "2025-04-19",
		taskType: "Other",
	},
	{
		id: 9,
		title: "Update user documentation",
		description: "Revise and update the user documentation.",
		status: "Not started",
		priority: "Low",
		effort: "Medium",
		dueDate: "2025-04-30",
		taskType: "Documentation",
	},
	{
		id: 10,
		title: "Conduct usability testing",
		description: "Perform usability tests to ensure the application is user-friendly.",
		status: "Not started",
		priority: "Medium",
		effort: "Medium",
		dueDate: "2025-04-27",
		taskType: "Testing",
	}
];

const statusOrder = ["Not started", "In progress", "In review", "Completed"];
const priorityOrder = ["High", "Medium", "Low"];

const sortedTasks = [...tasks].sort((a, b) => {
	const dateComparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
	if (dateComparison !== 0) return dateComparison;

	const priorityComparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
	if (priorityComparison !== 0) return priorityComparison;

	return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
});

const hasCompletedTasks = tasks.some(task => task.status === "Completed");

export function TaskTable() {
	const [expanded, setExpanded] = useState<number>(-1);
	const navigateWithData = useNavigateWithData();

	return (
		<>
			{sortedTasks.length === 0 ? (
				<div className="text-4xl font-extrabold">All tasks completed!</div>
			) : (
				<Table>
					<TableCaption>A list of your current tasks.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead></TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Effort</TableHead>
							<TableHead>Due Date</TableHead>
							<TableHead>Type</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedTasks.map((task) => (
							<TaskRow
								key={task.id}
								task={task}
								expanded={expanded}
								setExpanded={setExpanded}
								navigateWithData={navigateWithData}
							/>
						))}
					</TableBody>
				</Table>
			)}
			{hasCompletedTasks && (
				<div className="text-right m-6 mt-0">
					<Button variant='outline'>Delete all completed tasks</Button>
				</div>
			)}
		</>
	)
}

export default TaskTable;
