<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Separator } from "./ui/separator";

    import { Link, useForm } from "@inertiajs/svelte";
    import { loginWithOAuth } from "$lib/authService";

    let email: string | null = $state(null);
    let processing: boolean = $state(false);

    let isRedirecting : { [key: string]: boolean } = {
        'google': false,
        'github': false,
    }

    let form = useForm({
        email: null,
    });

    const onSubmit = (e: Event) => {
        processing = true;
        e.preventDefault();
        form.email = email;
        $form.post(window.route("password.email"));
        processing = false;
    };
</script>

<form onsubmit={(e) => {onSubmit(e)}}>
<Card.Root class="mx-auto max-w-sm bg-[#f3f3f3] dark:bg-[#0e0e0e]">
	<Card.Header>
		<Card.Title class="text-2xl">Mot de passe oublié ?</Card.Title>
		<Card.Description>Entrez votre email pour recevoir un lien de réinitialisation de mot de passe</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" bind:value={$form.email} required />
			</div>
			<Button type="submit" class="w-full" disabled={processing}>
                {processing ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
            </Button>
		</div>
	</Card.Content>
</Card.Root>
</form>