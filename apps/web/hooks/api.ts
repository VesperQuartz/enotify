import { useMutation } from "@tanstack/react-query";
import { ApiFormData } from "@/schema";
import { sendEmailNotification } from "@/services";

export const useSubmitForm = () => {
	return useMutation({
		mutationKey: ["submit-form"],
		mutationFn: async (data: ApiFormData) => {
			await sendEmailNotification(data);
		},
	});
};
