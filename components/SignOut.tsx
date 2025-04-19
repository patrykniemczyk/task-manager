import { signOutAction } from "@/lib/SignOutAction"
import { Button } from "@/components/ui/button"

export default function SignOut() {
	return (
		<form
			action={signOutAction}
		>
			<Button variant='outline' type="submit">Sign out</Button>
		</form>
	)
} 