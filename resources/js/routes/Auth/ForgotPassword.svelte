<script>
    import ForgotForm from "@/lib/components/ForgotForm.svelte";
    import { Navbar } from "$lib/components/ui/navbar";
    import { Layout } from "@/layouts/";
    import { toast } from "svelte-sonner";
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import { useForm } from "@inertiajs/svelte";
    import { onMount } from "svelte";

    let err = {};
    export let errors = {};
    export let status;
    let mounted = false;

    onMount(() => {
        mounted = true;
    });
    $: {
        err = errors;
        if (mounted) {
            if (status) {
                toast.success("Nous vous avons envoyé un lien de réinitialisation de mot de passe par e-mail.");
            }
        }
    }
</script>

<svelte:head>
    <title>Forgot Password</title>
</svelte:head>

<Layout>
    <Navbar title={true} link={false} />

    <BreezeValidationErrors class="mb-4" errors={err} />
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <ForgotForm />
    </div>
</Layout>
