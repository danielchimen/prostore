"use client";

import { SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signUpUser } from "@/lib/actions/user.actions";

import { useSearchParams } from "next/navigation";

const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" variant={"default"}>
        {pending ? "submitting..." : "Sign up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="mt-4"
            required
            autoComplete="name"
            defaultValue={SIGN_UP_DEFAULT_VALUES.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="mt-4"
            required
            autoComplete="email"
            defaultValue={SIGN_UP_DEFAULT_VALUES.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="mt-4"
            required
            autoComplete="password"
            defaultValue={SIGN_UP_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="mt-4"
            required
            autoComplete="confirmPassword"
            defaultValue={SIGN_UP_DEFAULT_VALUES.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-destructive text-center">{data.message}</div>
        )}

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self" className="link">
            Sign in!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;
