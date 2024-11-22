<script>
    import BreezeButton from "$lib/components/Button.svelte";
    import BreezeCheckbox from "$lib/components/Checkbox.svelte";
    import BreezeGuestLayout from "@/Layouts/Guest.svelte";
    import BreezeInput from "$lib/components/Input.svelte";
    import BreezeLabel from "$lib/components/Label.svelte";
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import { Link, useForm } from "@inertiajs/svelte";
    import { loginWithOAuth } from "$lib/authService";

    let err = {};
    export let errors = {};
    export let canResetPassword;
    export let status;
    let isRedirecting = false;

    const form = useForm({
        email: null,
        password: null,
        remember: false,
    });

    $: {
        err = errors;
    }

    const onSubmit = () => {
        $form.post("/login", {
            onSuccess: () => $form.reset(),
        });
    };

    const handleOAuth = (provider) => {
        console.log(`Starting OAuth for: ${provider}`);
        isRedirecting = true; // Active le spinner
        loginWithOAuth(provider);
    };
</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

<BreezeGuestLayout>
    <BreezeValidationErrors class="mb-4" errors={err} />

    {#if status}
        <div class="mb-4 font-medium text-sm text-green-600">
            {status}
        </div>
    {/if}

    <form on:submit|preventDefault={onSubmit}>
        <div>
            <BreezeLabel for="email" value="Email" />
            <BreezeInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                value={form.email}
                required
                autofocus
                autocomplete="username"
                on:input={(evt) => ($form.email = evt.detail)}
            />
        </div>

        <div class="mt-4">
            <BreezeLabel for="password" value="Password" />
            <BreezeInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                value={form.password}
                required
                autocomplete="current-password"
                on:input={(evt) => ($form.password = evt.detail)}
            />
        </div>

        <div class="block mt-4">
            <label class="flex items-center">
                <BreezeCheckbox name="remember" bind:checked={form.remember} />
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            {#if canResetPassword}
                <Link
                    href="/password/reset"
                    class="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    Forgot your password?
                </Link>
            {/if}

            <BreezeButton
                class="ml-4"
                sclass:opacity-25={form.processing}
                disabled={form.processing}
            >
                Log in
            </BreezeButton>
        </div>
    </form>

    <!-- Section OAuth -->
    <div class="mt-6">
        <p class="text-center text-gray-600">Or log in with:</p>
        <div class="flex justify-center space-x-4 mt-4">
            <BreezeButton
                class="bg-red-500 text-white"
                onclick={() => {
                    console.log('Google login button clicked');
                    handleOAuth('google');
                }}
                disabled={isRedirecting}
            >
                {#if isRedirecting}
                    Redirecting...
                {:else}
                    Log in with Google
                {/if}
            </BreezeButton>
            <BreezeButton
                class="bg-red-500 text-white"
                onclick={() => {
                    console.log('Github login button clicked');
                    handleOAuth('github');
                }}
                disabled={isRedirecting}
            >
                {#if isRedirecting}
                    Redirecting...
                {:else}
                    Log in with Github
                {/if}
            </BreezeButton>
        </div>
    </div>
</BreezeGuestLayout>