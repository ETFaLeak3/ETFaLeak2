<script>
    import BreezeValidationErrors from "$lib/components/ValidationErrors.svelte";
    import Toast from "@/layouts/Toast.svelte";
    import RegisterForm from "$lib/components/RegisterForm.svelte";
    
    export let errors = {};

    let err = {};

    $: {
        err = errors;
    }

</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<Toast>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <BreezeValidationErrors class="mb-4" errors={err} />
        <RegisterForm />
    </div>
</Toast>
