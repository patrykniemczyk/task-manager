import Image from "next/image"
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"

export default function SignIn() {
	return (
		<form
			action={async () => {
				"use server"
				await signIn("google", { redirectTo: "/tasks" })
			}}
		>
			<Button type='submit' className='p-5'>
				<Image src='/google.png' width={16} height={16} alt="Google" className="mr-2"></Image>
				Sign in with Google and stay organized
			</Button>
		</form>
	)
} 