import z from "zod";

export const formSchema = z.object({
	to: z.string().email(),
	context: z.object({
		user_first_name: z
			.string()
			.min(1, "User First Name is required")
			.trim()
			.transform((x) => x.split(" ")[0]),
		referred_user_name: z
			.string()
			.min(3, "Referred User Name is required")
			.trim()
			.toLowerCase(),
		course_name: z.string().min(1, "Course Name is required").trim(),
		referral_value: z.string().min(1, "Referral Value is required").trim(),
		currency: z.string(),
	}),
});

export type ApiFormData = z.infer<typeof formSchema>;
