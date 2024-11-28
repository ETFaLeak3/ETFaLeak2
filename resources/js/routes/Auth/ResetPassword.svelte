<script>
    import { Layout } from "@/layouts";
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import ResetForm from "@/lib/components/ResetForm.svelte";
    import { useForm } from "@inertiajs/svelte";
    let err = {};
    export let errors = {};
    export let email;
    export let token;
    $: {
        err = errors;
    }
</script>

<svelte:head>
    <title>Reset Password</title>
</svelte:head>

<Layout>
    <BreezeValidationErrors class="mb-4" errors={err} />
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <ResetForm {token} />
    </div>
</Layout>
