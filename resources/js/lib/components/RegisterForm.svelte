<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";

    import { Link, useForm } from "@inertiajs/svelte";

    let {canResetPassword} : {canResetPassword: boolean} = $props();

    let name: string | null = $state(null);
    let email: string | null = $state(null);
    let password: string | null = $state(null);
    let password_confirmation: string | null = $state(null);

    let isRedirecting : { [key: string]: boolean } = {
        'google': false,
        'github': false,
    }

    let form = useForm({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const onSubmit = (e: Event) => {
        e.preventDefault();
        form.name = name;
        form.email = email;
        form.password = password;
        form.password_confirmation = password_confirmation;
        $form.post("/register", {
            onSuccess: () => $form.reset('password', 'password_confirmation'),
        });
    };
</script>

<form onsubmit={(e) => {onSubmit(e)}}>
<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
            <div class="grid gap-2">
				<Label for="name">Username</Label>
				<Input id="name" type="text" placeholder="John Doe" bind:value={$form.name} required />
			</div>
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" bind:value={$form.email} required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type="password" bind:value={$form.password} required />
			</div>
            <div class="grid gap-2">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input id="password_confirmation" type="password" bind:value={$form.password_confirmation} required />
            </div>
			<Button type="submit" class="w-full" disabled={form.processing}>Register</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Login </a>
		</div>
	</Card.Content>
</Card.Root>
</form>