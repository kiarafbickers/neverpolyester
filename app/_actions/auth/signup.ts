"use server";

import { z } from "zod";
import insertActivity from "@/actions/activites/insertActivity";
import createSupabaseRLSClient from "@/lib/createSupabaseRLSClient";
import { COMPANY_BASIC_INFORMATION } from "@/constants";
import {
  InternalServerError,
  HookFormError,
  handleServerError,
  handleServerSuccess,
  ServerResponse,
} from "@/lib/handlingServerResponses";

type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      success?: boolean;
    }
  | undefined;

const SignupFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .regex(/^[^+]+$/, {
      message: 'Email addresses containing "+" are not allowed.',
    }) // Disallow "+" in email
    .trim(),
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

export default async function signup(
  state: SignUpFormState,
  formData: FormData
): Promise<ServerResponse<any, Record<string, string[]>>> {
  try {
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      throw new HookFormError(validatedFields.error.flatten().fieldErrors);
    }

    const supabase = createSupabaseRLSClient();
    const { error } = await supabase.auth.signUp({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      options: {
        emailRedirectTo: `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : COMPANY_BASIC_INFORMATION.URL
        }/account`,
      },
    });

    if (error) {
      if (error.status === 409) {
        // Handle email already registered
        throw new HookFormError({
          email: ["This email is already registered."],
        });
      }
      console.error("Error with signup:", error);
      throw new InternalServerError("Error signing you up. Contact Support.");
    }

    await insertActivity("new_signup", validatedFields.data.email);
    return handleServerSuccess();
  } catch (error) {
    return handleServerError(error, {});
  }
}
