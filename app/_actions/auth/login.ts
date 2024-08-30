"use server";

// Import Types
// Import External Packages
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
// Import Functions & Actions & Hooks & State
import insertActivity from "@/actions/activites/insertActivity";
import createSupabaseRLSClient from "@/lib/createSupabaseRLSClient";
// Import Error Handling
import {
  InternalServerError,
  HookFormError,
  handleServerError,
  ServerResponse,
} from "@/lib/handlingServerResponses";

type LoginFormState =
  | {
      errors?:
        | {
            name?: string[] | undefined;
            email?: string[] | undefined;
            password?: string[] | undefined;
            general?: string[] | undefined; // Add a general error field
          }
        | undefined;
      success?: boolean | undefined;
    }
  | undefined;

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .max(72, { message: "Be at most 72 characters long" })
    .trim(),
});

/**
 * Logs in a user with the provided form data.
 * @param state - The state of the sign-up form.
 * @param formData - The form data containing the email and password.
 * @returns A promise that resolves to a server response.
 */
export default async function login(
  state: LoginFormState,
  formData: FormData
): Promise<ServerResponse<any, Record<string, string[]>>> {
  try {
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validatedFields.success) {
      throw new HookFormError(validatedFields.error.flatten().fieldErrors);
    }
    const supabase = createSupabaseRLSClient();

    const { error } = await supabase.auth.signInWithPassword(
      validatedFields.data
    );
    if (error) {
      console.error("Error with login:", error);

      // Customize error messages based on specific error codes
      if (error.message.includes("Invalid login credentials")) {
        throw new HookFormError({ general: ["Invalid email or password."] });
      } else {
        throw new InternalServerError(
          "An error occurred while logging you in. Please try again."
        );
      }
    }
    await insertActivity("new_login", validatedFields.data.email);
  } catch (error) {
    return handleServerError(error, {});
  }
  revalidatePath("/account", "layout");
  redirect("/account");
}
