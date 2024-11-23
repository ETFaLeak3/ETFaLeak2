<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Separator } from "./ui/separator";

    import { Link, useForm } from "@inertiajs/svelte";
    import { loginWithOAuth } from "$lib/authService";

    let {canResetPassword} : {canResetPassword: boolean} = $props();

    let checked: boolean | 'indeterminate' = $state(false);
    let email: string | null = $state(null);
    let password: string | null = $state(null);

    let isRedirecting : { [key: string]: boolean } = {
        'google': false,
        'github': false,
    }

    let form = useForm({
        email: null,
        password: null,
        remember: false,
    });

    const onSubmit = (e: Event) => {
        e.preventDefault();
        form.remeber = checked;
        form.email = email;
        form.password = password;
        $form.post("/login", {
            onSuccess: () => $form.reset('password'),
        });
    };

    const handleOAuth = (provider : 'google' | 'github') => {
        console.log(`Starting OAuth for: ${provider}`);
        isRedirecting[provider] = true;
        loginWithOAuth(provider);
    };
</script>

<form onsubmit={(e) => {onSubmit(e)}}>
<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Connexion</Card.Title>
		<Card.Description>Entrez votre email et votre mot de passe pour vous connecter à votre compte</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" bind:value={$form.email} required />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
                    {#if canResetPassword}
                        <a href="/password/reset" class="ml-auto inline-block text-sm underline">
                            Mot de passe oublié?
                        </a>
                    {/if}
				</div>
				<Input id="password" type="password" bind:value={$form.password} required />
			</div>
            <div class="flex items-center">
                <Checkbox id="remember" bind:checked={$form.remember} aria-labelledby="remember-label" />
                <Label id="remember-label" for="remember" class="ml-2">Se souvenir de moi</Label>
            </div>
			<Button type="submit" class="w-full" disabled={form.processing}>Se connecter</Button>
            <Separator />
			<Button 
                type="button" 
                variant="outline" 
                class="w-full"
                onclick={() => {
                    console.log('Github login button clicked');
                    handleOAuth('github');
                }}
                disabled={isRedirecting['github']}
            >
                {#if isRedirecting['github']}
                    <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
                    </svg>
                {:else}
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                {/if}
                Se connecter avec Github
            </Button>
            <Button 
                type="button" 
                variant="outline" 
                class="w-full"
                onclick={() => {
                    console.log('Google login button clicked');
                    handleOAuth('google');
                }}
                disabled={isRedirecting['google']}
            >
                {#if isRedirecting['google']}
                    <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                    </svg>
                {:else}
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" /></svg>
                {/if}
                Se connecter avec Google
            </Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Pas encore de compte?
			<a href="/register" class="underline"> S'inscrire </a>
		</div>
	</Card.Content>
</Card.Root>
</form>