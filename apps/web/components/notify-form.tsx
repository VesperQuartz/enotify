"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { useSubmitForm } from "@/hooks/api";
import { formSchema } from "@/schema";

export function NotifyForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const submit = useSubmitForm();
	const form = useForm({
		defaultValues: {
			to: "",
			context: {
				user_first_name: "",
				referred_user_name: "",
				course_name: "",
				referral_value: "",
				currency: "NGN",
			},
		},
		validators: {
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			await submit.mutateAsync(value, {
				onSuccess: () => {
					toast.success("Notification sent successfully");
				},
				onError: () => {
					toast.error("Something went wrong");
				},
			});
		},
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="w-100">
				<CardHeader>
					<CardTitle>Send Notifications</CardTitle>
					<CardDescription>
						Enter details below to send notifications
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name="to">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="email">Recipient</FieldLabel>
											<Input
												id="to"
												type="text"
												placeholder="recipient@example.com"
												name={field.name}
												value={field.state.value}
												aria-invalid={isInvalid}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="context.user_first_name">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="name">Name</FieldLabel>
											<Input
												id="name"
												type="text"
												placeholder="John Doe"
												name={field.name}
												value={field.state.value}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="context.referred_user_name">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="username">Username</FieldLabel>
											<Input
												id="username"
												type="text"
												placeholder="John_Doe"
												name={field.name}
												value={field.state.value}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="context.course_name">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="course">Course Name</FieldLabel>
											<Input
												id="course"
												type="text"
												placeholder="Computer Science"
												name={field.name}
												value={field.state.value}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="context.currency">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="currency">Currency Name</FieldLabel>
											<Input
												id="currency"
												type="text"
												placeholder="NGN"
												name={field.name}
												value={field.state.value}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="context.referral_value">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field>
											<FieldLabel htmlFor="referral_value">
												Referral Value
											</FieldLabel>
											<Input
												id="referral_value"
												type="text"
												placeholder="123456"
												name={field.name}
												value={field.state.value}
												required
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							</form.Field>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit, isSubmitting]) => {
									return (
										<Field>
											<Button
												className="w-full cursor-pointer"
												type="submit"
												disabled={!canSubmit}
											>
												{isSubmitting ? (
													<LoaderCircleIcon className="animate-spin" />
												) : (
													"Submit"
												)}
											</Button>
										</Field>
									);
								}}
							</form.Subscribe>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
