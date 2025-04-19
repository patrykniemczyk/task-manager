'use client'
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import { getTasks, deleteAllCompletedTasks } from "@/actions";
import { Button } from "@/components/ui/button";
import useNavigateWithData from '@/hooks/useNavigateWithData';
import { Task } from "@/types/Task";
import { TaskRow } from "@/components/TaskRow";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const statusOrder = ["Not started", "In progress", "In review", "Completed"];
const priorityOrder = ["High", "Medium", "Low"];

export function TaskTable() {
	const { data: session } = useSession();

	const [tasks, setTasks] = useState<Task[]>([]);
	const [expanded, setExpanded] = useState<number>(-1);
	const [loading, setLoading] = useState(true);

	if (!session) {
		redirect("/");
	}

	const navigateWithData = useNavigateWithData();

	const handleDelete = (taskId: number) => {
		setTasks(prev => prev.filter(task => task.id !== taskId));
	};

	const handleDeleteAllCompleted = async () => {
		if (!session?.user?.email) {
			console.error("User email is undefined");
			return;
		}
		await deleteAllCompletedTasks(session.user.email);
		setTasks(prev => prev.filter(task => task.status !== "Completed"));
	};


	useEffect(() => {
		async function fetchTasks() {
			if (!session?.user?.email) {
				console.error("User email is undefined");
				setLoading(false);
				return;
			}
			const fetchedTasks = await getTasks(session.user.email);
			setTasks(fetchedTasks.map(task => ({
				id: task.id,
				title: task.title,
				description: task.description,
				status: task.status,
				priority: task.priority,
				effort: task.effort,
				duedate: task.duedate,
				tasktype: task.tasktype,
			})));
			setLoading(false);
		}
		fetchTasks();
	}, [session]);

	const sortedTasks = [...tasks].sort((a, b) => {
		const getDateValue = (date: string) =>
			date === '-' ? -Infinity : new Date(date).getTime();

		const dateComparison = getDateValue(a.duedate) - getDateValue(b.duedate);
		if (dateComparison !== 0) return dateComparison;

		const priorityComparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
		if (priorityComparison !== 0) return priorityComparison;

		return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
	});


	const hasCompletedTasks = tasks.some(task => task.status === "Completed");

	const renderSkeletonRows = (count: number = 3) => (
		Array.from({ length: count }).map((_, idx) => (
			<TableRow key={idx}>
				{Array.from({ length: 8 }).map((_, i) => (
					<TableCell key={i}>
						<Skeleton className="h-4 w-full" />
					</TableCell>
				))}
			</TableRow>
		))
	);

	return (
		<>
			{loading ? (
				<Table>
					<TableCaption>Loading tasks...</TableCaption>
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
					<TableBody>{renderSkeletonRows()}</TableBody>
				</Table>
			) : sortedTasks.length === 0 ? (
				<div className="text-5xl mt-10 font-extrabold text-center">All tasks completed!</div>
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
						{sortedTasks.map((task, index) => (
							<TaskRow
								key={index}
								task={task}
								expanded={expanded}
								setExpanded={setExpanded}
								navigateWithData={navigateWithData}
								onDelete={handleDelete}
							/>
						))}
					</TableBody>
				</Table>
			)}

			{hasCompletedTasks && !loading && (
				<div className="text-right m-6 mt-0">
					<Button variant='outline' onClick={handleDeleteAllCompleted}>
						Delete all completed tasks
					</Button>
				</div>
			)}
		</>
	)
}

export default TaskTable;
