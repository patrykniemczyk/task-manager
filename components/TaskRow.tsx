import React from "react";
import Image from "next/image";
import { Task } from "@/types/Task";
import { TableCell, TableRow } from "@/components/ui/table";

interface TaskRowProps {
    task: Task;
    expanded: number;
    setExpanded: React.Dispatch<React.SetStateAction<number>>;
    navigateWithData: (task: Task) => void;
}

export function TaskRow({ task, expanded, setExpanded, navigateWithData }: TaskRowProps) {
    return (
        <React.Fragment key={task.id}>
            <TableRow>
                <TableCell className="flex flex-row gap-3">
                    <Image
                        src='/arrow.png'
                        width={16}
                        height={16}
                        alt="See more"
                        className={`invert cursor-pointer transition-transform duration-300 ${expanded === task.id ? 'rotate-90' : 'rotate-0'}`}
                        onClick={() => setExpanded(expanded === task.id ? -1 : task.id)}
                    />
                </TableCell>

                <TableCell className="font-medium">{task.title}</TableCell>

                <TableCell className={`
                    ${task.status === "Not started" ? "text-blue-100" : ""}
                    ${task.status === "In progress" ? "text-blue-400" : ""}
                    ${task.status === "In review" ? "text-green-200" : ""}
                    ${task.status === "Completed" ? "text-green-300" : ""}
                    `}>
                    {task.status}
                </TableCell>


                <TableCell
                    className={`
                        ${task.priority === "High" ? "text-red-300" : ""}
                        ${task.priority === "Medium" ? "text-yellow-200" : ""}
                        ${task.priority === "Low" ? "text-green-300" : ""}
							 `}
                >{task.priority}</TableCell>

                <TableCell
                    className={`
                        ${task.effort === "High" ? "text-red-300" : ""}
                        ${task.effort === "Medium" ? "text-yellow-200" : ""}
                        ${task.effort === "Low" ? "text-green-300" : ""}
							  `}
                >{task.effort}</TableCell>

                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.taskType}</TableCell>

                <TableCell className="flex flex-row gap-3">
                    <Image
                        src='/edit.png'
                        width={16}
                        height={16}
                        alt="Edit task"
                        onClick={() => navigateWithData(task)}
                        className="invert cursor-pointer"
                    />
                    <Image
                        src='/bin.png'
                        width={16}
                        height={16}
                        alt="Delete task"
                        className="invert cursor-pointer"
                    />
                </TableCell>
            </TableRow>

            {expanded === task.id && (
                <TableRow>
                    <TableCell colSpan={8}>
                        <div className="p-2 rounded-md text-sm text-gray-300 max-w-[calc(var(--container-4xl)-calc(var(--spacing)*2*2))] break-words whitespace-normal">
                            {task.description}
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </React.Fragment >
    );
}
