<script lang="ts">
    import { toast } from "svelte-sonner";

    let className;
    let hasErrors = false;

    export { className as class };
    export let errors: { [key: string]: string } = {};

    $: {
        hasErrors = Object.keys(errors).length > 0;
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                toast.error(errors[key]);

            }
        }
    }
</script>
