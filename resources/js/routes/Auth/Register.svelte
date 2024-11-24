<script>
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import { Layout } from "@/layouts";
    import RegisterForm from "$lib/components/RegisterForm.svelte";
    import { Navbar } from "$lib/components/ui/navbar";

    export let errors = {};

    let err = {};

    $: {
        err = errors;
    }

</script>

<svelte:head>
    <title>S'inscrire</title>
</svelte:head>

<Layout>
    <Navbar title={true} link={false} />
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <BreezeValidationErrors class="mb-4" errors={err} />
        <RegisterForm />
    </div>
</Layout>
