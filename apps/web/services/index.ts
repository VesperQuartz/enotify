import ky from "ky";
import { ApiFormData } from "@/schema";

export const createEnvUrl = (
	env: "development" | "production" | "test" | "staging",
) => {
	if (["development", "test", "staging"].some((x) => x === env)) {
		return "webhook-test/send-notify";
	}
	return "webhook/send-notify";
};

export const sendEmailNotification = async (data: ApiFormData) => {
	console.log(process.env.NEXT_PUBLIC_N8NURL, "URL");
	const response = await ky.post(
		`${process.env.NEXT_PUBLIC_N8NURL}/${createEnvUrl(process.env.NODE_ENV as "development" | "production" | "test" | "staging")}`,
		{
			json: {
				...data,
				context: {
					...data.context,
					recipient: data.to,
					template: "referrals",
					referralTrackingPageUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/app/referrals`,
				},
			},
			credentials: "include",
		},
	);

	return response.json();
};
