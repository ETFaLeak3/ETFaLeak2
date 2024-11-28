<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";

    import { Link, useForm } from "@inertiajs/svelte";
    import { string } from "zod";

    let { token } : { token: string } = $props();

    let email: string | null = $state(null);
    let password: string | null = $state(null);
    let password_confirmation: string | null = $state(null);

    let form = useForm({
        token: token,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const onSubmit = (e: Event) => {
        e.preventDefault();
        form.email = email;
        form.password = password;
        form.password_confirmation = password_confirmation;
        $form.post("/reset-password", {
            onSuccess: () => $form.reset("password", "password_confirmation"),
        });
    };
</script>

<form onsubmit={(e) => {onSubmit(e)}}>
<Card.Root class="mx-auto max-w-sm bg-[#f3f3f3] dark:bg-[#0e0e0e]">
	<Card.Header>
		<Card.Title class="text-2xl">Réinitialisation du mot de passe</Card.Title>
		<Card.Description>Entrez votre email et votre nouveau mot de passe pour réinitialiser votre mot de passe</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" bind:value={$form.email} required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Mot de passe</Label>
				<Input id="password" type="password" bind:value={$form.password} required />
			</div>
            <div class="grid gap-2">
                <Label for="password_confirmation">Confirmation du mot de passe</Label>
                <Input id="password_confirmation" type="password" bind:value={$form.password_confirmation} required />
            </div>
			<Button type="submit" class="w-full" disabled={form.processing}>Réinitialiser</Button>
		</div>
	</Card.Content>
</Card.Root>
</form>