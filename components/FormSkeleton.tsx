import { Skeleton } from '@/components/ui/skeleton';

const FormSkeleton = () => (
	<div className="max-w-3xl mx-auto mt-20 space-y-6">
		<Skeleton className="h-10 w-1/2" />
		<div className="space-y-5">
			{[...Array(5)].map((_, i) => (
				<Skeleton key={i} className="h-10 w-full" />
			))}
			<Skeleton className="h-24 w-full" />
			<Skeleton className="h-12 w-64 ml-auto" />
		</div>
	</div>
);

export default FormSkeleton;
