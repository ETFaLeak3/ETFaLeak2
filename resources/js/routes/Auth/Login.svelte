<script>
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import Toast from "@/layouts/Toast.svelte";

    import LoginForm from "$lib/components/LoginForm.svelte";

    let err = {};
    export let errors = {};
    export let canResetPassword;
    export let status;

    $: {
        err = errors;
    }

</script>

<svelte:head>
    <title>Log in</title>
</svelte:head>

<Toast>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <BreezeValidationErrors class="mb-4" errors={err} />

        {#if status}
            <div class="mb-4 font-medium text-sm text-green-600">
                {status}
            </div>
        {/if}

        <LoginForm canResetPassword={canResetPassword} />

    </div>
</Toast>