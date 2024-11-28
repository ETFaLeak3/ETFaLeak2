<script>
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import { Layout } from "@/layouts";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    import { Navbar } from "$lib/components/ui/navbar";

    import LoginForm from "$lib/components/LoginForm.svelte";

    let err = {};
    export let errors = {};
    export let canResetPassword;
    export let status;

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    $: {
        err = errors;
        if (mounted) {
            if (status == "Your password has been reset.") {
                toast.success("Votre mot de passe a été réinitialisé.");
            }
        }
    }

</script>

<svelte:head>
    <title>Se connecter</title>
</svelte:head>

<Layout>
    <Navbar title={true} link={false} />
    <div class="w-screen h-screen flex flex-col items-center justify-center">

        <BreezeValidationErrors class="mb-4" errors={err} />

        <LoginForm canResetPassword={canResetPassword} />

    </div>
</Layout>