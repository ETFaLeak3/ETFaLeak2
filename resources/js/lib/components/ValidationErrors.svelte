<script lang="ts">
    import { toast } from "svelte-sonner";

    let hasErrors = false;

    export let errors: { [key: string]: string } = {};

    $: {
        hasErrors = Object.keys(errors).length > 0;
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                if (errors[key] === "These credentials do not match our records.") {
                    toast.error("Veuillez vérifier vos identifiants");
                } else if (errors[key] === "The email must be a valid email address.") {
                    toast.error("Veuillez entrer une adresse email valide");
                } else if (errors[key] === "The email has already been taken.") {
                    toast.error("Cette adresse email est déjà utilisée");
                } else if (errors[key] === "The password must be at least 8 characters.") {
                    toast.error("Le mot de passe doit contenir au moins 8 caractères");
                } else if (errors[key] === "The password confirmation does not match.") {
                    toast.error("Les mots de passe ne correspondent pas");
                } else {
                    toast.error(errors[key]);
                }
            }
        }
    }

    hasErrors = false;
    errors = {};
</script>
